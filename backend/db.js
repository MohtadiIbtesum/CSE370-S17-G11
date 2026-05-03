import mysql from 'mysql2';

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "PC_STORE",
  port: 3306
}).promise();


// ================= USERS =================

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


// ================= PRODUCTS =================

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


// ================= ADMIN PRODUCTS =================

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


// ================= UPDATE =================

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


// ================= DELETE PRODUCT =================

export async function deleteProduct(product_id){

    const result = await db.query(`
        DELETE FROM PRODUCTS WHERE product_id = ${product_id}
    `);

    return result[0];
}


// ================= STOCK =================

export async function updateProductStock(product_id, quantity){
    const result = await db.query(`
        UPDATE PRODUCTS 
        SET stock_qty = stock_qty - ${quantity}
        WHERE product_id = ${product_id}
    `);

    return result[0];
}


// ================= CART / ORDER =================

export async function getCart(order_id){
    const cart = await db.query(`
        SELECT p.product_name, p.price, op.quantity
        FROM ORDER_PRODUCTS op
        JOIN PRODUCTS p ON op.product_id = p.product_id
        WHERE op.order_id = ${order_id}
    `);

    return cart[0];
}

export async function placeOrder(customer_id) {
    const result = await db.query(`
        INSERT INTO ORDERS (order_date, status, customer_id)
        VALUES (NOW(), 'placed', ${customer_id})
    `);

    return result[0];
}


// ================= BUILDER =================

export async function getProductsByCategory(category_id) {
    const result = await db.query(`
        SELECT * FROM PRODUCTS WHERE category_id = ${category_id}
    `);

    return result[0];
}