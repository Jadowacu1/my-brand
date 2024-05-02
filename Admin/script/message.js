const loder = document.getElementById("loader");
const url =
  "https://mybrand-backend-j767.onrender.com/api/messages/viewMessages";
const fetchFeedbacks = async () => {
  //   const token = localStorage.getItem("token");
  if (token == null) {
    alert("Your Token is Expired");
    window.location.href = "../index.html";
    return;
  }
  loder.style.display = "block";
  const tasks = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await tasks.json();
  console.log(data);
  loder.style.display = "none";
  data.forEach((message) => {
    console.log(message._id);

    const tbody = document.getElementById("allTask");
    const tr = document.createElement("tr");
    const checkboxTd = document.createElement("td");
    checkboxTd.innerHTML = `<input type="checkbox" name="taskCheckbox" data-task-id="${message._id}">`;
    tr.appendChild(checkboxTd);
    const nameTd = document.createElement("td");
    nameTd.innerText = `${message.firstName} ${message.lastName}`;
    tr.appendChild(nameTd);

    const emailTd = document.createElement("td");
    emailTd.innerHTML = `${message.email}`;
    tr.appendChild(emailTd);
    const phoneTd = document.createElement("td");
    phoneTd.innerHTML = `${message.phoneNumber}`;
    tr.appendChild(phoneTd);
    const messageTd = document.createElement("td");
    messageTd.innerHTML = `${message.message}`;
    tr.appendChild(messageTd);
    const actionsTd = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.title = "Delete User";
    deleteButton.classList.add("delete");
    deleteButton.dataset.userId = message._id;
    deleteButton.innerHTML = deleteButton.innerHTML =
      '<i class="fas fa-trash-alt"></i> Delete';
    deleteButton.addEventListener("click", deleteMessage);
    actionsTd.appendChild(deleteButton);
    tr.appendChild(actionsTd);
    tbody.appendChild(tr);
  });
};
fetchFeedbacks();
function deleteMessage() {
  const token = localStorage.getItem("token");
  if (token == null) {
    alert("Your Token is Expired");
    window.location.href = "login.html";
    return;
  }
  const checkboxes = document.querySelectorAll(
    'input[name="taskCheckbox"]:checked'
  );
  const taskIds = Array.from(checkboxes).map((checkbox) =>
    checkbox.getAttribute("data-task-id")
  );
  console.log(taskIds);
  if (taskIds) {
    taskIds.forEach(async (e) => {
      console.log(e);
      try {
        const url = `https://mybrand-backend-j767.onrender.com/api/messages/deletingMessage/${e}`;
        loder.style.display = "block";
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const message = await response.json();
          loder.style.display = "none";
          alert(message);
        }
        const message = await response.json();
        loder.style.display = "none";
        alert(message);
        window.location.href = "messages.html";
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    });
  }
}
