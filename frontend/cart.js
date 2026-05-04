let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart");

function renderCart() {
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px; color:#94a3b8;">
        Cart is empty
      </div>
    `;
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");

    div.style = `
      background:#1f2937;
      padding:15px;
      margin-bottom:12px;
      border-radius:10px;
      display:flex;
      justify-content:space-between;
      align-items:center;
    `;

    div.innerHTML = `
      <div>
        <h3 style="margin:0;">${item.product_name}</h3>
        <p style="margin:5px 0;">৳ ${item.price}</p>
      </div>

      <div>
        <button onclick="decrease(${item.product_id})">-</button>
        <span style="margin:0 10px;">${item.quantity}</span>
        <button onclick="increase(${item.product_id})">+</button>
        <button onclick="removeItem(${item.product_id})" style="margin-left:10px; color:red;">X</button>
      </div>
    `;

    container.appendChild(div);
  });

  renderTotal();
}

function increase(id) {
  cart = cart.map(item =>
    item.product_id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  updateCart();
}

function decrease(id) {
  cart = cart
    .map(item =>
      item.product_id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0);

  updateCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.product_id !== id);
  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  toggleCheckoutBtn();
}

function renderTotal() {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  
  let totalBox = document.getElementById("totalBox");

  if (!totalBox) {
    totalBox = document.createElement("div");
    totalBox.id = "totalBox";
    totalBox.style = `
      margin-top:20px;
      padding:15px;
      background:#111827;
      border-radius:10px;
      font-size:18px;
    `;
    container.parentElement.appendChild(totalBox);
  }

  totalBox.innerHTML = `<b>Total: ৳ ${total.toFixed(2)}</b>`;
}

async function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const customer_id = localStorage.getItem("user_id");

  try {
    const res = await fetch("http://localhost:3100/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_id,
        cartItems: cart
      })
    });

    const data = await res.json();

    if (data.success) {
      alert(`Order placed! Order ID: ${data.order_id}, Invoice ID: ${data.invoice_id}`);

      cart = [];
      updateCart();
      renderTotal()
    } else {
      alert("Checkout failed: " + data.error);
    }

  } catch (err) {
    console.error(err);
    alert("Checkout error occurred");
  }
}

function toggleCheckoutBtn() {
  const btn = document.getElementById("checkoutBtn");
  if (btn) {
    btn.style.display = cart.length > 0 ? "block" : "none";
    btn.style.padding = "12px";
    btn.style.background = "#38bdf8";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.cursor = "pointer";
    btn.fontWeight = "bold";
  }
}

renderCart();
toggleCheckoutBtn();