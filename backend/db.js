import mysql from 'mysql2';

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "PC_STORE"
}).promise();



// User functions
export async function getUsers(){
    const users = await db.query("SELECT * FROM USERS")
    return users[0]
};

export async function getUser(id) {
    const user = await db.query(`SELECT * FROM USERS WHERE user_id = ${id}`);
    return user[0];
}

export async function createUser(name, email, password) {
    const result = await db.query(`INSERT INTO USERS (name, email, password) VALUES ("${name}", "${email}", "${password}")`);
    return result[0];
}

// product functions
export async function getProducts(){
    const products = await db.query("SELECT * FROM PRODUCTS");
    return products[0];
}

export async function getProduct(id){
    const product = await db.query(
        `SELECT * FROM PRODUCTS WHERE product_id = ${id}`
    );

    const specs = await db.query(
        `SELECT * FROM SPECIFICATIONS WHERE product_id = ${id}`
    );

    return {
        product: product[0],
        specs: specs[0]
    };
}

// admin product add function
export async function createProduct(name, price, stock, brand_id, category_id){
    const result = await db.query(`
        INSERT INTO PRODUCTS 
        (product_name, price, stock_qty, date_added, brand_id, category_id)
        VALUES 
        ("${name}", ${price}, ${stock}, NOW(), ${brand_id}, ${category_id})
    `);

    return result[0];
}


// cart functions
export async function addToCart(order_id, product_id, quantity){
    const result = await db.query(`
        INSERT INTO ORDER_PRODUCTS (order_id, product_id, quantity)
        VALUES (${order_id}, ${product_id}, ${quantity})
    `);

    return result[0];
}

export async function getCart(order_id){
    const cart = await db.query(`
        SELECT p.product_name, p.price, op.quantity
        FROM ORDER_PRODUCTS op
        JOIN PRODUCTS p ON op.product_id = p.product_id
        WHERE op.order_id = ${order_id}
    `);

    return cart[0];
}

export async function placeOrder(user_id, total_amount) {
    const result = await db.query(`
        INSERT INTO ORDERS (user_id, total_amount, status)
        VALUES (${user_id}, ${total_amount}, 'processing')
    `);
    return result[0];
}

