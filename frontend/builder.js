const API = "http://localhost:3100";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let build = {
  cpu: null,
  gpu: null,
  motherboard: null,
  ram: null
};

async function loadProducts() {
  const categoryEl = document.getElementById("category");
  const container = document.getElementById("products");

  if (!categoryEl || !container) return;

  const category = categoryEl.value;

  let url = `${API}/products`;

  if (category !== "all") {
    url = `${API}/builder/${category}`;
  }

  const res = await fetch(url);
  const products = await res.json();

  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");

    div.className = "product";

    div.innerHTML = `
      <h3>${p.product_name}</h3>
      <p>৳ ${p.price}</p>
      <p>Stock: ${p.stock_qty}</p>

      <button onclick="selectProduct(${p.category_id}, ${p.product_id})">
        Select
      </button>

      <button onclick="addToCart(${p.product_id}, '${p.product_name}', ${p.price})">
        Add to Cart
      </button>
    `;

    container.appendChild(div);
  });
}

async function selectProduct(categoryId, id) {
  const res = await fetch(`${API}/products/${id}`);
  const data = await res.json();

  const product = data.product;
  const specs = data.specs;

  const item = {
    id: product.product_id,
    name: product.product_name,
    price: Number(product.price),
    tdp: Number(specs.tdp || 0),
    socket: specs.socket || null,
    ram_type: specs.ram_type || null
  };

  if (categoryId == 1) build.cpu = item;
  if (categoryId == 2) build.gpu = item;
  if (categoryId == 3) build.motherboard = item;
  if (categoryId == 4) build.ram = item;

  renderBuild();
  calculateTotals();
}

function renderBuild() {
  const el = document.getElementById("build");
  if (!el) return;

  el.innerHTML = `
    <p>CPU: ${build.cpu?.name || "Not selected"}</p>
    <p>GPU: ${build.gpu?.name || "Not selected"}</p>
    <p>Motherboard: ${build.motherboard?.name || "Not selected"}</p>
    <p>RAM: ${build.ram?.name || "Not selected"}</p>
  `;
}

function calculateTotals() {
  let totalPrice = 0;
  let totalPower = 0;

  Object.values(build).forEach(part => {
    if (part) {
      totalPrice += part.price;
      totalPower += part.tdp;
    }
  });

 

  const el = document.getElementById("totals");
  if (!el) return;

  el.innerHTML = `
    <p>Total Price: ৳ ${totalPrice}</p>
    <p>Total Power: ${totalPower}W</p>
  `;
}

function addBuildToCart() {
  let totalPrice = 0;

  Object.values(build).forEach(part => {
    if (part) totalPrice += part.price;
  });

  if (totalPrice === 0) {
    alert("Select components first");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    product_id: Date.now(),
    product_name: "Custom PC Build",
    price: totalPrice,
    quantity: 1
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Build added to cart");
}

function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(i => i.product_id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      product_id: id,
      product_name: name,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function checkCompatibility() {
  fetch(`${API}/check-compatibility`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(build)
  })
  .then(res => res.json())
  .then(data => {
    if (!data.compatible) {
      alert("Selected components are not compatible.");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});