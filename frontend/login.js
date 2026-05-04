const API = "http://localhost:3100";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("user_name", data.name);

    window.location.href = "index.html";
  } else {
    document.getElementById("msg").innerText = data.message;
  }
}