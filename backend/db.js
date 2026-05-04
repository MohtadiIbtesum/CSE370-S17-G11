import mysql from 'mysql2';

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "pc_store",
  port: 3306
}).promise();


// users

export async function getUsers(){
    const users = await db.query("SELECT * FROM USERS");
    return users[0];
}

export async function getUser(id) {
    const user = await db.query(`SELECT * FROM USERS WHERE user_id = ${id}`);
    return user[0];
}

export async function createUser(name, email, password) {
    const result = await db.query(`
        INSERT INTO USERS (name, email, password)
        VALUES ("${name}", "${email}", "${password}")
    `);
    return result[0];
}

export async function getUserIdAndPasswordByEmail(email,password) {
    const user = await db.query(`
        SELECT user_id, name 
        FROM USERS 
        WHERE email = "${email}" AND password = "${password}"
    `);
    return user[0];
}


// products

export async function getProducts(){
    const products = await db.query("SELECT * FROM PRODUCTS");
    return products[0];
}

export async function getProduct(id){

    const product = await db.query(
        `SELECT * FROM PRODUCTS WHERE product_id = ${id}`
    );

    const specs = await db.query(
        `SELECT spec_name, spec_value FROM SPECIFICATIONS WHERE product_id = ${id}`
    );

    const specMap = {};
    specs[0].forEach(s => {
        specMap[s.spec_name] = s.spec_value;
    });

    return {
        product: product[0][0],
        specs: specMap
    };
}


// admin products

export async function createProduct(name, price, stock, brand_id, category_id) {
    const [rows] = await db.query(`
        SELECT MAX(product_id) AS maxId FROM PRODUCTS
    `);

    const nextId = (rows[0].maxId || 0) + 1;

    const result = await db.query(`
        INSERT INTO PRODUCTS 
        (product_id, product_name, price, stock_qty, date_added, brand_id, category_id)
        VALUES 
        (${nextId}, "${name}", ${price}, ${stock}, NOW(), ${brand_id}, ${category_id})
    `);

    return result[0];
}


export async function readAllProduct() {
    const products = await db.query(`
        SELECT p.product_id, p.product_name, p.price, p.stock_qty,
               b.brand_name, c.category_name
        FROM PRODUCTS p
        JOIN BRANDS b ON p.brand_id = b.brand_id
        JOIN CATEGORIES c ON p.category_id = c.category_id
    `);

    return products[0];
}

export async function readProductById(product_id) {
    const product = await db.query(`
        SELECT p.product_id, p.product_name, p.price, p.stock_qty,
               b.brand_name, c.category_name
        FROM PRODUCTS p
        JOIN BRANDS b ON p.brand_id = b.brand_id
        JOIN CATEGORIES c ON p.category_id = c.category_id
        WHERE p.product_id = ${product_id}
    `);

    return product[0];
}


// update product

export async function updateProduct(product_id, name, price, stock, brand_id, category_id) {
    const result = await db.query(`
        UPDATE PRODUCTS
        SET product_name = "${name}",
            price = ${price},
            stock_qty = ${stock},
            brand_id = ${brand_id},
            category_id = ${category_id}
        WHERE product_id = ${product_id}
    `);

    return result[0];
}


// delete product

export async function deleteProduct(product_id){

    await db.query(`
        DELETE FROM ORDER_PRODUCTS WHERE product_id = ${product_id}
    `);

    await db.query(`
        DELETE FROM BUILD_INCLUDES WHERE product_id = ${product_id}
    `);

    const result = await db.query(`
        DELETE FROM PRODUCTS WHERE product_id = ${product_id}
    `);

    return result[0];
}

// stock

export async function updateProductStock(product_id, quantity){
    const result = await db.query(`
        UPDATE PRODUCTS 
        SET stock_qty = stock_qty - ${quantity}
        WHERE product_id = ${product_id}
    `);

    return result[0];
}


// cart & orders

export async function getCart(order_id){
    const cart = await db.query(`
        SELECT p.product_name, p.price, op.quantity
        FROM ORDER_PRODUCTS op
        JOIN PRODUCTS p ON op.product_id = p.product_id
        WHERE op.order_id = ${order_id}
    `);

    return cart[0];
}

export async function checkoutOrder(customer_id, cartItems) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [maxOrder] = await connection.query(`SELECT MAX(order_id) as maxId FROM ORDERS`);
        const order_id = (maxOrder[0].maxId || 0) + 1;

        await connection.query(`
            INSERT INTO ORDERS (order_id, order_date, status, customer_id)
            VALUES (?, NOW(), 'Pending', ?)
        `, [order_id, customer_id]);

        for (const item of cartItems) {
            await connection.query(`
                INSERT INTO ORDER_PRODUCTS (order_id, product_id, quantity)
                VALUES (?, ?, ?)
            `, [order_id, item.product_id, item.quantity]);

            await connection.query(`
                UPDATE PRODUCTS 
                SET stock_qty = stock_qty - ?
                WHERE product_id = ?
            `, [item.quantity, item.product_id]);
        }

        const [maxInvoice] = await connection.query(`SELECT MAX(invocie_id) as maxId FROM INVOICES`);
        const invocie_id = (maxInvoice[0].maxId || 0) + 1;

        await connection.query(`
            INSERT INTO INVOICES (invocie_id, invoice_date, order_id)
            VALUES (?, NOW(), ?)
        `, [invocie_id, order_id]);

        await connection.commit();
        return { success: true, order_id, invocie_id };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}



export async function getAllOrders() {
    const orders = await db.query(`
        SELECT o.order_id, o.order_date, o.status, o.customer_id, u.name as customer_name
        FROM ORDERS o
        LEFT JOIN USERS u ON o.customer_id = u.user_id
        ORDER BY o.order_date DESC
    `);
    return orders[0];
}

export async function updateOrderStatus(order_id, status) {
    const result = await db.query(`
        UPDATE ORDERS
        SET status = ?
        WHERE order_id = ?
    `, [status, order_id]);
    return result[0];
}

export async function getProductOrderStatus() {
    const result = await db.query(`
        SELECT 
            p.product_id,
            p.product_name,
            p.price,
            p.stock_qty,
            op.order_id,
            op.quantity AS ordered_qty,
            o.status AS order_status,
            o.order_date,
            u.name AS customer_name
        FROM PRODUCTS p
        LEFT JOIN ORDER_PRODUCTS op ON p.product_id = op.product_id
        LEFT JOIN ORDERS o ON op.order_id = o.order_id
        LEFT JOIN USERS u ON o.customer_id = u.user_id
        ORDER BY p.product_id ASC, o.order_date DESC
    `);
    return result[0];
}


export async function getProductsByCategory(category_id) {
    const result = await db.query(`
        SELECT * FROM PRODUCTS WHERE category_id = ${category_id}
    `);

    return result[0];
}