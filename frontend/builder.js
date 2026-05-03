const API = "http://localhost:3100";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

    div.innerHTML = `
      <h3>${p.product_name}</h3>
      <p>৳ ${p.price}</p>
      <p>Stock: ${p.stock_qty}</p>

      <button onclick="selectProduct(${p.category_id}, ${p.product_id}, '${p.product_name}', ${p.price})">
        Select
      </button>

      <button onclick="addToCart(${p.product_id}, '${p.product_name}', ${p.price})">
        Add to Cart
      </button>

      <hr>
    `;

    container.appendChild(div);
  });
}

let build = {
  cpu: null,
  gpu: null,
  motherboard: null,
  ram: null,
  storage: null,
  psu: null,
  case: null
};

function selectProduct(categoryId, id, name, price) {
  const item = {
    product_id: id,
    product_name: name,
    price: Number(price),
    category_id: categoryId
  };

  if (categoryId == 1) build.cpu = item;
  if (categoryId == 2) build.gpu = item;
  if (categoryId == 3) build.motherboard = item;
  if (categoryId == 4) build.ram = item;
  if (categoryId == 5) build.storage = item;
  if (categoryId == 6) build.psu = item;
  if (categoryId == 7) build.case = item;

  renderBuild();
}

function renderBuild() {
  const el = document.getElementById("build");
  if (!el) return;

  el.innerHTML = `
    <p>CPU: ${build.cpu?.product_name || "Not selected"}</p>
    <p>GPU: ${build.gpu?.product_name || "Not selected"}</p>
    <p>Motherboard: ${build.motherboard?.product_name || "Not selected"}</p>
    <p>RAM: ${build.ram?.product_name || "Not selected"}</p>
    <p>Storage: ${build.storage?.product_name || "Not selected"}</p>
    <p>PSU: ${build.psu?.product_name || "Not selected"}</p>
    <p>Case: ${build.case?.product_name || "Not selected"}</p>
  `;
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

function renderCart() {
  const container = document.getElementById("cart");
  if (!container) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  container.innerHTML = "";

  cart.forEach(item => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p>${item.product_name} x ${item.quantity}</p>
      <p>৳ ${item.price * item.quantity}</p>
    `;

    container.appendChild(div);
  });
}

window.checkCompatibility = async function () {
  const cpu = build.cpu;
  const gpu = build.gpu;
  const ram = build.ram;
  const motherboard = build.motherboard;

  const result = document.getElementById("build");

  const res = await fetch(`${API}/check-compatibility`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cpu_id: 1,
      gpu_id: 2,
      ram_id: 3,
      motherboard_id: 4
    })
  });

  const data = await res.json();

  result.innerHTML += `<br><br>` + (data.compatible ? "OK" : data.issues.join("<br>"));
};

window.addBuildToCart = function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  Object.values(build).forEach(item => {
    if (item) {
      cart.push({
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
        quantity: 1
      });
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));
};

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  renderCart();
});