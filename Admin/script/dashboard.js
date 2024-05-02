const loder = document.getElementById("loader");
loder.style.display = "none";
const blogNumbers = document.getElementById("blogNumbers");
const messageNumbers = document.getElementById("messageNumbers");
const userNumbers = document.getElementById("userNumbers");
const messagesCard = document.querySelector(".messages");
const blogsCard = document.querySelector(".blogs");
const usersCard = document.querySelector(".users");

messagesCard.addEventListener("click", (e) => {
  window.location.href = "messages.html";
});
blogsCard.addEventListener("click", (e) => {
  window.location.href = "blogs.html";
});

usersCard.addEventListener("click", (e) => {
  window.location.href = "users.html";
});
loder.style.display = "block";
const url =
  "https://mybrand-backend-j767.onrender.com/api/messages/viewMessages";
const fetchFeedbacks = async () => {
  const tasks = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await tasks.json();
  const NumberOfMessages = data.length;
  console.log(NumberOfMessages);
  messageNumbers.innerText = NumberOfMessages;
};
fetchFeedbacks();
const url1 = "https://mybrand-backend-j767.onrender.com/api/users/viewUsers";

const fetchUsers = async () => {
  const tasks = await fetch(url1, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await tasks.json();
  const NumberOfUsers = data.length;
  userNumbers.innerHTML = `<b>${NumberOfUsers}</b>`;
};
fetchUsers();
const url2 = "https://mybrand-backend-j767.onrender.com/api/blogs/read";
const fetchBlogs = async () => {
  const tasks = await fetch(url2, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await tasks.json();
  const NumberOfBlogs = data.length;
  blogNumbers.innerHTML = `<b>${NumberOfBlogs}</b>`;
  loder.style.display = "none";
};
fetchBlogs();
