const API = "http://localhost:3100";

async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (data.success) {
    alert("Account created!");
    window.location.href = "login.html";
  } else {
    document.getElementById("msg").innerText = "Signup failed";
  }
}