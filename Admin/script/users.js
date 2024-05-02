const url = "https://mybrand-backend-j767.onrender.com/api/users/viewUsers";
const loder = document.getElementById("loader");
const fetchUsers = async () => {
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
  data.forEach((user) => {
    console.log(user._id);

    const tbody = document.getElementById("all");
    const tr = document.createElement("tr");
    const checkboxTd = document.createElement("td");
    checkboxTd.innerHTML = `<input type="checkbox" name="taskCheckbox" data-task-id="${user._id}">`;
    tr.appendChild(checkboxTd);
    const emailTd = document.createElement("td");
    emailTd.innerHTML = user.email;
    tr.appendChild(emailTd);

    const actionsTd = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.title = "Delete User";
    deleteButton.classList.add("delete");
    deleteButton.dataset.userId = user._id;
    deleteButton.innerHTML = deleteButton.innerHTML =
      '<i class="fas fa-trash-alt"></i> Delete';
    deleteButton.addEventListener("click", deleteMessage);
    actionsTd.appendChild(deleteButton);

    tr.appendChild(actionsTd);
    tbody.appendChild(tr);
  });
  loder.style.display = "none";
};

fetchUsers();

async function deleteMessage(event) {
  const token = localStorage.getItem("token");
  if (token == null) {
    alert("Your Token is Expired");
    window.location.href = "index.html";
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
        const url = `https://mybrand-backend-j767.onrender.com/api/users/deleteUser/${e}`;
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
        window.location.href = "users.html";
      } catch (error) {
        loder.style.display = "none";
        console.error("Error deleting task:", error);
      }
    });
  }
}
