const form = document.getElementById("form");

const loder = document.getElementById("loader");
loder.style.display = "none";

const messageView = document.getElementById("message");
form.addEventListener("submit", async (Event) => {
  Event.preventDefault();
  let email = document.getElementById("email").value;
  let lname = document.getElementById("lname").value;
  let fname = document.getElementById("fname").value;
  let phone = document.getElementById("phone").value;
  let txt = document.getElementById("txt").value;
  message = {
    firstName: fname,
    lastName: lname,
    email: email,
    phoneNumber: phone,
    message: txt,
  };
  loder.style.display = "block";
  const url =
    "https://mybrand-backend-j767.onrender.com/api/messages/recordingMessage";
  try {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (response.ok) {
      const message = await response.json();
      alert(message);
      window.location.href = "contact.html";
      loder.style.display = "none";
    } else {
      const message = await response.json();
      messageView.innerHTML = message;
      loder.style.display = "none";
    }
  } catch (err) {
    console.error(err);
  }
});
