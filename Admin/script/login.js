const form = document.getElementById("login");
const messageView = document.getElementById("message");
const loder = document.getElementById("loader");
loder.style.display = "none";
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = {
    email: email,
    password: password,
  };
  
    const url = "https://mybrand-backend-j767.onrender.com/api/users/login";
    loder.style.display = "block";
    const response = await fetch(url, {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
     
      const message = await response.json();
      const role = message;
      const tokenPayload = role.split(".")[1];
      const decodedToken = JSON.parse(atob(tokenPayload));
      const userRole = decodedToken.role;
      loder.style.display = "none";
      if (userRole === "admin") {
        localStorage.setItem("token", message);
        window.location.href = "dashboard.html";
      }
    } else {
      loder.style.display = "none";
      const message = await response.json();
      messageView.innerHTML = "incorrect email or password";
    }
 
});
