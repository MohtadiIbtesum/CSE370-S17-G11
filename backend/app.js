import express from 'express';
import {getUser, getUsers, createUser, getProduct,getProducts,createProduct} from './db.js';
import cors from 'cors';

const app = express();
const PORT = 3100;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

// user routes

app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.post('/create-user', async (req, res) => {
  const { name, email, password } = req.body;
  const result = await createUser(name, email, password);
  res.send(result);
});

// product routes

app.get('/products', async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

app.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  const product = await getProduct(id);
  res.send(product);
});

app.post('/create-product', async (req, res) => {
  const { name, price, stock, brand_id, category_id } = req.body;
  const result = await createProduct(name, price, stock, brand_id, category_id);
  res.send(result);
});


app.get('/admin', (req, res) => {
  res.send('Admin dashboard');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});