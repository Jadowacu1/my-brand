const form = document.getElementById("login");
const messageView = document.getElementById("message");
const loader = document.getElementById("loader");
loader.style.display = "none";
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = {
    email: email,
    password: password,
  };
  try {
    const url = "https://mybrand-backend-j767.onrender.com/api/users/login";
    loader.style.display = "block";
    const response = await fetch(url, {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const message = await response.json();
      localStorage.setItem("token", message);
      const token = localStorage.getItem("token");
      const tokenPayload = token.split(".")[1];
      const decodedToken = JSON.parse(atob(tokenPayload));
      const userRole = decodedToken.role;

      if (userRole === "client") {
        window.location.href = "blog.html";
        loader.style.display = "none";
      } else {
        const message = await response.json();
        messageView.innerHTML = message;
        loader.style.display = "none";
      }
    } else {
      const message = await response.json();
      messageView.innerHTML = message;
      loader.style.display = "none";
    }
  } catch (error) {
    // console.error(error);
  }
});
