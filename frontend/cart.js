let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart");

function renderCart() {
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Cart is empty</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${item.product_name}</h3>
      <p>Price: $${item.price}</p>

      <button onclick="decrease(${item.product_id})">-</button>
      <span>${item.quantity}</span>
      <button onclick="increase(${item.product_id})">+</button>

      <button onclick="removeItem(${item.product_id})">Remove</button>
      <hr>
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
  cart = cart.map(item =>
    item.product_id === id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  ).filter(item => item.quantity > 0); // remove if 0

  updateCart();
}


function removeItem(id) {
  cart = cart.filter(item => item.product_id !== id);
  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderTotal() {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h2>Total: $${total.toFixed(2)}</h2>`;

  container.appendChild(totalDiv);
}


renderCart();