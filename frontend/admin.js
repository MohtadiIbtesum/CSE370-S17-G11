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

// ---------------- ORDERS ----------------

async function loadOrders() {
  const res = await fetch(`${API}/admin/orders`);
  const orders = await res.json();
  const container = document.getElementById("orders");
  container.innerHTML = "";

  if (!orders || orders.length === 0) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  orders.forEach((order) => {
    const statusColors = { Pending: "#f59e0b", Paid: "#10b981", Delivered: "#3b82f6" };
    const color = statusColors[order.status] || "#6b7280";

    const div = document.createElement("div");
    div.style.cssText = "border:1px solid #ccc;padding:10px;margin:8px 0;border-radius:6px;";
    div.innerHTML = `
      <strong>Order #${order.order_id}</strong> &nbsp;
      <span style="background:${color};color:#fff;padding:2px 10px;border-radius:12px;font-size:0.85em;">${order.status}</span>
      <p>Customer: ${order.customer_name || "Guest"} (ID: ${order.customer_id})</p>
      <p>Date: ${order.order_date ? new Date(order.order_date).toLocaleDateString() : "N/A"}</p>
      <label>Update Status:
        <select onchange="changeOrderStatus(${order.order_id}, this.value)">
          <option value="" disabled selected>-- change --</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Delivered">Delivered</option>
        </select>
      </label>
      <hr>
    `;
    container.appendChild(div);
  });
}

async function changeOrderStatus(order_id, status) {
  try {
    const res = await fetch(`${API}/admin/orders/${order_id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.affectedRows > 0) {
      alert(`Order #${order_id} updated to "${status}"`);
      loadOrders();
      loadProductOrderStatus();
    } else {
      alert("Update failed.");
    }
  } catch (err) {
    alert("Failed to update order status.");
  }
}

// ---------------- PRODUCT ORDER STATUS ----------------

async function loadProductOrderStatus() {
  const res = await fetch(`${API}/admin/product-order-status`);
  const rows = await res.json();
  const container = document.getElementById("productOrderStatus");
  container.innerHTML = "";

  if (!rows || rows.length === 0) {
    container.innerHTML = "<p>No data available.</p>";
    return;
  }

  // Group rows by product_id
  const grouped = {};
  rows.forEach((row) => {
    if (!grouped[row.product_id]) {
      grouped[row.product_id] = {
        product_id: row.product_id,
        product_name: row.product_name,
        price: row.price,
        stock_qty: row.stock_qty,
        orders: []
      };
    }
    if (row.order_id) {
      grouped[row.product_id].orders.push({
        order_id: row.order_id,
        ordered_qty: row.ordered_qty,
        order_status: row.order_status,
        order_date: row.order_date,
        customer_name: row.customer_name
      });
    }
  });

  Object.values(grouped).forEach((product) => {
    const isOrdered = product.orders.length > 0;
    const badge = isOrdered
      ? `<span style="background:#10b981;color:#fff;padding:2px 10px;border-radius:12px;font-size:0.82em;">Ordered</span>`
      : `<span style="background:#9ca3af;color:#fff;padding:2px 10px;border-radius:12px;font-size:0.82em;">Not Ordered</span>`;

    let orderRows = "";
    if (isOrdered) {
      orderRows = product.orders.map((o) => {
        const statusColors = { Pending: "#f59e0b", Paid: "#10b981", Delivered: "#3b82f6" };
        const sc = statusColors[o.order_status] || "#6b7280";
        return `
          <tr>
            <td style="padding:4px 8px;">Order #${o.order_id}</td>
            <td style="padding:4px 8px;">${o.customer_name || "Guest"}</td>
            <td style="padding:4px 8px;">Qty: ${o.ordered_qty}</td>
            <td style="padding:4px 8px;">
              <span style="background:${sc};color:#fff;padding:1px 8px;border-radius:10px;font-size:0.8em;">${o.order_status}</span>
            </td>
            <td style="padding:4px 8px;">${o.order_date ? new Date(o.order_date).toLocaleDateString() : "N/A"}</td>
          </tr>`;
      }).join("");
      orderRows = `<table style="width:100%;border-collapse:collapse;margin-top:8px;font-size:0.9em;">${orderRows}</table>`;
    }

    const div = document.createElement("div");
    div.style.cssText = "border:1px solid #ddd;padding:10px;margin:8px 0;border-radius:6px;";
    div.innerHTML = `
      <strong>${product.product_name}</strong> &nbsp; ${badge}
      <p style="margin:4px 0;">ID: ${product.product_id} | Price: ৳${product.price} | Stock: ${product.stock_qty}</p>
      ${orderRows}
    `;
    container.appendChild(div);
  });
}

// ---------------- INIT ----------------

loadProducts();
loadOrders();
loadProductOrderStatus();