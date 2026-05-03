const API = "http://localhost:3100";


async function loadProducts() {
  const category = document.getElementById("categoryFilter").value;

  let url = `${API}/products`;

  if (category !== "all") {
    url = `${API}/builder/${category}`;
  }

  const res = await fetch(url);
  const products = await res.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${p.product_name}</h3>
      <p>Price: ৳${p.price}</p>
      <p>Stock: ${p.stock_qty}</p>

      <button onclick="addToCart(${p.product_id}, '${p.product_name}', ${p.price})">
        Add to Cart
      </button>

      <hr>
    `;

    container.appendChild(div);
  });
}


function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, name, price) {
  let cart = getCart();

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  saveCart(cart);
  renderCart();
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);

  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart");

  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");

    div.innerHTML = `
      <p>${item.name} x ${item.quantity} - ৳${item.price * item.quantity}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;

    container.appendChild(div);
  });

  document.getElementById("total").textContent = total;
}



async function loadBuilderOptions() {
  try {
    const cpu = await fetch(`${API}/builder/1`).then(r => r.json());
    const ram = await fetch(`${API}/builder/3`).then(r => r.json());
    const gpu = await fetch(`${API}/builder/4`).then(r => r.json());
    const mobo = await fetch(`${API}/builder/2`).then(r => r.json());

    fillSelect("cpu", cpu);
    fillSelect("motherboard", mobo);
    fillSelect("ram", ram);
    fillSelect("gpu", gpu);

  } catch (err) {
    console.error("Error loading builder options:", err);
  }
}

function fillSelect(id, items) {
  const select = document.getElementById(id);
  if (!select) return;

  select.innerHTML = "";

  items.forEach(p => {
    const option = document.createElement("option");
    option.value = p.product_id;
    option.textContent = p.product_name;
    select.appendChild(option);
  });
}

/* =========================
   COMPATIBILITY CHECK
========================= */

async function checkCompatibility() {

  const cpuEl = document.getElementById("cpu");
  const moboEl = document.getElementById("motherboard");
  const ramEl = document.getElementById("ram");
  const gpuEl = document.getElementById("gpu");
  const resultEl = document.getElementById("result");

  if (!cpuEl || !moboEl || !ramEl || !gpuEl) {
    console.error("Builder elements missing in HTML");
    return;
  }

  const res = await fetch(`${API}/check-compatibility`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cpu_id: cpuEl.value,
      motherboard_id: moboEl.value,
      ram_id: ramEl.value,
      gpu_id: gpuEl.value
    })
  });

  const data = await res.json();

  if (data.compatible) {
    resultEl.innerHTML = "✅ " + data.message;
  } else {
    resultEl.innerHTML = "❌<br>" + data.issues.join("<br>");
  }
}

/* =========================
   INIT
========================= */

loadProducts();
renderCart();
loadBuilderOptions();