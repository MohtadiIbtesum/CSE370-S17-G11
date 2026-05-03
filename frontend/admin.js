// // const API = "http://localhost:3100";

// // // ---------------- LOAD PRODUCTS ----------------

// // async function loadProducts() {
// //   const res = await fetch(`${API}/products`);
// //   const products = await res.json();

// //   const container = document.getElementById("products");
// //   container.innerHTML = "";

// //   products.forEach((p) => {
// //     const div = document.createElement("div");

// //     div.innerHTML = `
// //   <h3>${p.product_name}</h3>
// //   <p>Price: ৳${p.price}</p>
// //   <p>Stock: ${p.stock_qty}</p>

// //   <button onclick="viewProduct(${p.product_id})">View</button>
// //   <button onclick="editProduct(${p.product_id})">Edit</button>
// //   <button onclick="deleteProduct(${p.product_id})">Delete</button>

// //   <hr>
// // `;

// //     container.appendChild(div);
// //   });
// // }

// // // ---------------- VIEW PRODUCT ----------------

// // async function viewProduct(id) {
// //   const res = await fetch(`${API}/products/${id}`);
// //   const data = await res.json();

// //   alert(JSON.stringify(data.product[0], null, 2));
// // }

// // // ---------------- ADD PRODUCT ----------------

// // document.getElementById("productForm").addEventListener("submit", async (e) => {
// //   e.preventDefault();

// //   const name = document.getElementById("name").value;
// //   const price = document.getElementById("price").value;
// //   const stock = document.getElementById("stock").value;
// //   const brand_id = document.getElementById("brand_id").value;
// //   const category_id = document.getElementById("category_id").value;

// //   await fetch(`${API}/products`, {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({
// //       name,
// //       price,
// //       stock,
// //       brand_id,
// //       category_id,
// //     }),
// //   });

// //   alert("Product added");
// //   loadProducts();
// // });

// // // ---------------- DELETE ----------------

// // async function deleteProduct(id) {
// //   await fetch(`${API}/products/${id}`, {
// //     method: "DELETE",
// //   });

// //   alert("Deleted");
// //   loadProducts();
// // }

// // async function editProduct(id) {

// //   const res = await fetch(`http://localhost:3100/products/${id}`);
// //   const data = await res.json();

// //   const product = data.product;

// //   if (!product) {
// //     console.error("Product not found");
// //     return;
// //   }

// //   document.getElementById("name").value = product.product_name;
// //   document.getElementById("price").value = product.price;
// //   document.getElementById("stock").value = product.stock_qty;
// //   document.getElementById("brand_id").value = product.brand_id;
// //   document.getElementById("category_id").value = product.category_id;
// // }
// // // edit product (ADMIN USE)
// // document.getElementById("editForm").addEventListener("submit", async (e) => {
// //   e.preventDefault();

// //   const id = document.getElementById("edit_id").value;

// //   const name = document.getElementById("edit_name").value;
// //   const price = document.getElementById("edit_price").value;
// //   const stock = document.getElementById("edit_stock").value;
// //   const brand_id = document.getElementById("edit_brand_id").value;
// //   const category_id = document.getElementById("edit_category_id").value;

// //   await fetch(`${API}/products/${id}`, {
// //     method: "PUT",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({
// //       name,
// //       price,
// //       stock,
// //       brand_id,
// //       category_id,
// //     }),
// //   });

// //   alert("Product updated");

// //   loadProducts();
// // });

// // // ---------------- INIT ----------------

// // loadProducts();



// const API = "http://localhost:3100";

// // ---------------- LOAD PRODUCTS ----------------

// async function loadProducts() {
//   const res = await fetch(`${API}/products`);
//   const products = await res.json();

//   const container = document.getElementById("products");
//   container.innerHTML = "";

//   products.forEach((p) => {
//     const div = document.createElement("div");

//     div.innerHTML = `
//   <h3>${p.product_name}</h3>
//   <p>Price: ৳${p.price}</p>
//   <p>Stock: ${p.stock_qty}</p>

//   <button onclick="viewProduct(${p.product_id})">View</button>
//   <button onclick="editProduct(${p.product_id})">Edit</button>
//   <button onclick="deleteProduct(${p.product_id})">Delete</button>

//   <hr>
// `;

//     container.appendChild(div);
//   });
// }

// // ---------------- VIEW PRODUCT ----------------

// async function viewProduct(id) {
//   const res = await fetch(`${API}/products/${id}`);
//   const data = await res.json();

//   alert(JSON.stringify(data.product[0], null, 2));
// }

// // ---------------- ADD PRODUCT ----------------

// document.getElementById("productForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const name = document.getElementById("name").value;
//   const price = document.getElementById("price").value;
//   const stock = document.getElementById("stock").value;
//   const brand_id = document.getElementById("brand_id").value;
//   const category_id = document.getElementById("category_id").value;

//   await fetch(`${API}/products`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name,
//       price,
//       stock,
//       brand_id,
//       category_id,
//     }),
//   });

//   alert("Product added");
//   loadProducts();
// });

// // ---------------- DELETE ----------------

// async function deleteProduct(id) {
//   await fetch(`${API}/products/${id}`, {
//     method: "DELETE",
//   });

//   alert("Deleted");
//   loadProducts();
// }

// async function editProduct(id) {

//   const res = await fetch(`${API}/products/${id}`);
//   const data = await res.json();

//   const product = Array.isArray(data.product) ? data.product[0] : data.product;

//   if (!product) {
//     console.error("Product not found");
//     return;
//   }

//   document.getElementById("edit_id").value = id;
//   document.getElementById("edit_name").value = product.product_name;
//   document.getElementById("edit_price").value = product.price;
//   document.getElementById("edit_stock").value = product.stock_qty;
//   document.getElementById("edit_brand_id").value = product.brand_id;
//   document.getElementById("edit_category_id").value = product.category_id;
// }
// // edit product (ADMIN USE)
// document.getElementById("editForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const id = document.getElementById("edit_id").value;

//   const name = document.getElementById("edit_name").value;
//   const price = document.getElementById("edit_price").value;
//   const stock = document.getElementById("edit_stock").value;
//   const brand_id = document.getElementById("edit_brand_id").value;
//   const category_id = document.getElementById("edit_category_id").value;

//   await fetch(`${API}/products/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name,
//       price,
//       stock,
//       brand_id,
//       category_id,
//     }),
//   });

//   alert("Product updated");

//   loadProducts();
// });

// // ---------------- INIT ----------------

// loadProducts();


const API = "http://localhost:3100";

// ---------------- LOAD PRODUCTS ----------------

async function loadProducts() {
  const res = await fetch(`${API}/products`);
  const products = await res.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((p) => {
    const div = document.createElement("div");

    div.innerHTML = `
  <h3>${p.product_name}</h3>
  <p>Price: ৳${p.price}</p>
  <p>Stock: ${p.stock_qty}</p>

  <button onclick="viewProduct(${p.product_id})">View</button>
  <button onclick="editProduct(${p.product_id})">Edit</button>
  <button onclick="deleteProduct(${p.product_id})">Delete</button>

  <hr>
`;

    container.appendChild(div);
  });
}

// ---------------- VIEW PRODUCT ----------------

async function viewProduct(id) {
  const res = await fetch(`${API}/products/${id}`);
  const data = await res.json();

  alert(JSON.stringify(data.product, null, 2));
}

// ---------------- ADD PRODUCT ----------------

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const brand_id = document.getElementById("brand_id").value;
  const category_id = document.getElementById("category_id").value;

  await fetch(`${API}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      stock,
      brand_id,
      category_id,
    }),
  });

  alert("Product added");
  loadProducts();
});

// ---------------- DELETE ----------------

async function deleteProduct(id) {
  await fetch(`${API}/products/${id}`, {
    method: "DELETE",
  }).catch((err) => {
    console.error("Error deleting product:", err);
    alert("Failed to delete product. Please try again.");
    return;
  });

  alert("Deleted");
  loadProducts();
}

async function editProduct(id) {

  const res = await fetch(`${API}/products/${id}`);
  const data = await res.json();

  const product = Array.isArray(data.product) ? data.product[0] : data.product;

  if (!product) {
    console.error("Product not found");
    return;
  }

  document.getElementById("edit_id").value = id;
  document.getElementById("edit_name").value = product.product_name;
  document.getElementById("edit_price").value = product.price;
  document.getElementById("edit_stock").value = product.stock_qty;
  document.getElementById("edit_brand_id").value = product.brand_id;
  document.getElementById("edit_category_id").value = product.category_id;
}
// edit product (ADMIN USE)
document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("edit_id").value;

  const name = document.getElementById("edit_name").value;
  const price = document.getElementById("edit_price").value;
  const stock = document.getElementById("edit_stock").value;
  const brand_id = document.getElementById("edit_brand_id").value;
  const category_id = document.getElementById("edit_category_id").value;

  await fetch(`${API}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      stock,
      brand_id,
      category_id,
    }),
  });

  alert("Product updated");

  loadProducts();
});

// ---------------- INIT ----------------

loadProducts();