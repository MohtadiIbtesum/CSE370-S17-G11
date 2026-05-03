// import express from 'express';
// import cors from 'cors';

// import {
//   getUser,
//   getUsers,
//   createUser,
//   getProduct,
//   getProducts,
//   createProduct,
//   deleteProduct,
//   updateProduct,
//   getProductsByCategory
// } from './db.js';

// const app = express();
// const PORT = 3100;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ---------------- USERS ----------------

// app.get('/users', async (req, res) => {
//   const users = await getUsers();
//   res.json(users);
// });

// app.post('/create-user', async (req, res) => {
//   const { name, email, password } = req.body;
//   const result = await createUser(name, email, password);
//   res.json(result);
// });

// // ---------------- PRODUCTS ----------------

// // all products
// app.get('/products', async (req, res) => {
//   const products = await getProducts();
//   res.json(products);
// });

// // single product + specs
// app.get('/products/:id', async (req, res) => {
//   const product = await getProduct(req.params.id);
//   res.json(product);
// });

// // create product
// app.post('/products', async (req, res) => {
//   const { name, price, stock, brand_id, category_id } = req.body;
//   const result = await createProduct(name, price, stock, brand_id, category_id);
//   res.json(result);
// });

// // delete product
// app.delete('/products/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log("Deleting product:", id);

//     const result = await deleteProduct(id);

//     res.send(result);
//   } catch (err) {
//     console.error("DELETE ERROR:", err);
//     res.status(500).send(err.message);
//   }
// });

// // update product
// app.put('/products/:id', async (req, res) => {
//   try {
//     const { name, price, stock, brand_id, category_id } = req.body;

//     const result = await updateProduct(
//       req.params.id,
//       name,
//       price,
//       stock,
//       brand_id,
//       category_id
//     );

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ---------------- BUILDER ----------------

// app.get('/builder/:category_id', async (req, res) => {
//   try {
//     const products = await getProductsByCategory(req.params.category_id);
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// app.post('/check-compatibility', async (req, res) => {
//   try {
//     const { cpu_id, motherboard_id, ram_id, gpu_id } = req.body;

//     const cpu = await getProduct(cpu_id);
//     const mobo = await getProduct(motherboard_id);
//     const ram = await getProduct(ram_id);
//     const gpu = await getProduct(gpu_id);

//     let issues = [];

//     // CPU ↔ Motherboard
//     if (cpu.specs.socket !== mobo.specs.socket) {
//       issues.push("CPU socket does not match motherboard");
//     }

//     // RAM ↔ Motherboard
//     if (ram.specs.ram_type !== mobo.specs.ram_type) {
//       issues.push("RAM type not supported by motherboard");
//     }

//     // Power check
//     const totalTdp =
//       Number(cpu.specs.tdp || 0) +
//       Number(gpu.specs.tdp || 0);

//     if (totalTdp > 500) {
//       issues.push("High power consumption (check PSU)");
//     }

//     if (issues.length === 0) {
//       res.json({
//         compatible: true,
//         message: "All components compatible"
//       });
//     } else {
//       res.json({
//         compatible: false,
//         issues
//       });
//     }

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ---------------- ADMIN ----------------

// app.get('/admin', (req, res) => {
//   res.send('Admin dashboard');
// });

// app.get('/admin/orders', (req, res) => {
//   res.send('Admin orders');
// });

// // ---------------- ERROR HANDLER ----------------

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something broke!' });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



import express from 'express';
import cors from 'cors';

import {
  getUser,
  getUsers,
  createUser,
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
  checkoutOrder
} from './db.js';

const app = express();
const PORT = 3100;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- USERS ----------------

app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.post('/create-user', async (req, res) => {
  const { name, email, password } = req.body;
  const result = await createUser(name, email, password);
  res.json(result);
});

// ---------------- PRODUCTS ----------------

// all products
app.get('/products', async (req, res) => {
  const products = await getProducts();
  res.json(products);
});

// single product + specs
app.get('/products/:id', async (req, res) => {
  const product = await getProduct(req.params.id);
  res.json(product);
});

// create product
app.post('/products', async (req, res) => {
  const { name, price, stock, brand_id, category_id } = req.body;
  const result = await createProduct(name, price, stock, brand_id, category_id);
  res.json(result);
});

// delete product
app.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting product:", id);

    const result = await deleteProduct(id);

    res.send(result);
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).send(err.message);
  }
});

// update product
app.put('/products/:id', async (req, res) => {
  try {
    const { name, price, stock, brand_id, category_id } = req.body;

    const result = await updateProduct(
      req.params.id,
      name,
      price,
      stock,
      brand_id,
      category_id
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- CHECKOUT ----------------

app.post('/checkout', async (req, res) => {
  try {
    const { customer_id, cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const result = await checkoutOrder(customer_id, cartItems);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- BUILDER ----------------

app.get('/builder/:category_id', async (req, res) => {
  try {
    const products = await getProductsByCategory(req.params.category_id);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- COMPATIBILITY ENGINE ----------------

app.post('/check-compatibility', async (req, res) => {
  try {
    const { cpu_id, motherboard_id, ram_id, gpu_id } = req.body;

    const cpu = await getProduct(cpu_id);
    const mobo = await getProduct(motherboard_id);
    const ram = await getProduct(ram_id);
    const gpu = await getProduct(gpu_id);

    let issues = [];

    // CPU ↔ Motherboard
    if (cpu.specs.socket !== mobo.specs.socket) {
      issues.push("CPU socket does not match motherboard");
    }

    // RAM ↔ Motherboard
    if (ram.specs.ram_type !== mobo.specs.ram_type) {
      issues.push("RAM type not supported by motherboard");
    }

    // Power check
    const totalTdp =
      Number(cpu.specs.tdp || 0) +
      Number(gpu.specs.tdp || 0);

    if (totalTdp > 500) {
      issues.push("High power consumption (check PSU)");
    }

    if (issues.length === 0) {
      res.json({
        compatible: true,
        message: "All components compatible"
      });
    } else {
      res.json({
        compatible: false,
        issues
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- ADMIN ----------------

app.get('/admin', (req, res) => {
  res.send('Admin dashboard');
});

app.get('/admin/orders', (req, res) => {
  res.send('Admin orders');
});

// ---------------- ERROR HANDLER ----------------

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});