const email = localStorage.getItem("email");
const otp = document.getElementById("otp");
const form = document.getElementById("verify");
const loder = document.getElementById("loader");
loder.style.display = "none";
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = {
    email: email,
    otp: otp.value,
  };
  const url =
    "https://mybrand-backend-j767.onrender.com/api/users/userVerification";
  loder.style.display = "block";
  const response = await fetch(url, {
    method: "post",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    loder.style.display = "none";
    const message = await response.json();
    alert(message);
    window.location.href = "login.html";
  }
  loder.style.display = "none";
  const message = await response.json();
  alert(message);
});
