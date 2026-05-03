let allProducts = [];

const grid = document.getElementById("productGrid");

fetch("http://localhost:3100/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts();
  });

function renderProducts() {
  const filter = document.getElementById("filter").value;

  grid.innerHTML = "";

  let filtered = allProducts;

  if (filter !== "all") {
    filtered = allProducts.filter(p => p.category_id == filter);
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${p.product_name}</h3>
      <p class="price">৳ ${p.price}</p>
      <p>Stock: ${p.stock_qty}</p>

      <button onclick="addToCart(${p.product_id}, '${p.product_name}', ${p.price})">
        Add to Cart
      </button>
    `;

    grid.appendChild(card);
  });
}

function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.product_id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      product_id: id,
      product_name: name,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}