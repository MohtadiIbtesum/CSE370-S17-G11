fetch("http://localhost:3100/products")
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("products");

    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${p.product_name}</h3>
        <p>Price: ৳${p.price}</p>
        <p>Stock: ${p.stock_qty}</p>
        <button onclick="viewProduct(${p.product_id})">
          View
        </button>
      `;

      container.appendChild(card);
    });
  });

function viewProduct(id) {
  window.location.href = `product.html?id=${id}`;
}