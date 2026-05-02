const id = new URLSearchParams(window.location.search).get("id");

fetch(`http://localhost:3100/products/${id}`)
  .then(res => res.json())
  .then(data => {
    const product = data.product[0];

    document.getElementById("name").innerText = product.product_name;
    document.getElementById("price").innerText = "Price: " + product.price;

    const specList = document.getElementById("specs");

    data.specs.forEach(s => {
      const li = document.createElement("li");
      li.innerText = `${s.spec_name}: ${s.spec_value}`;
      specList.appendChild(li);
    });

    document.getElementById("addBtn").onclick = () => {
      addToCart(product);
    };
  });

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(p => p.product_id === product.product_id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      product_id: product.product_id,
      product_name: product.product_name,
      price: product.price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart");
}