const form = document.getElementById("form");
const messageView = document.getElementById("message");
const loader = document.getElementById("loader");
loader.style.display = "none";
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  const password1 = form.password1.value;
  const user = {
    email: email,
    password: password,
    confirm: password1,
  };
  try {
    const url =
      "https://mybrand-backend-j767.onrender.com/api/users/registration";
    loader.style.display = "block";
    const response = await fetch(url, {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const message = await response.json();
      messageView.innerHTML = message;
      loader.style.display = "none";
    }
    const result = await response.json();
    localStorage.setItem("email", email);
    alert(result);
    window.location.href = "verify.html";
    loader.style.display = "none";
  } catch (error) {
    console.error("Fetch error:", error);
  }
});
