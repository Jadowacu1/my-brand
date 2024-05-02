const loder = document.getElementById("loader");
loder.style.display = "none";
const url = "https://mybrand-backend-j767.onrender.com/api/blogs/read";
const fetchTasks = async () => {
  //   const token = localStorage.getItem("token");
  if (token == null) {
    alert("Your Token is Expired");
    window.location.href = "index.html";
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
  loder.style.display = "none";
  const data = await tasks.json();
  console.log(data.length);
  data.forEach((task) => {
    const tbody = document.getElementById("all");
    const tr = document.createElement("tr");
    const checkboxTd = document.createElement("td");
    checkboxTd.innerHTML = `<input type="checkbox" name="taskCheckbox" data-task-id="${task._id}">`;
    tr.appendChild(checkboxTd);
    const titleTd = document.createElement("td");
    titleTd.innerText = `${task.title}`;
    tr.appendChild(titleTd);
    const deleteTd = document.createElement("td");
    const editTd = document.createElement("td");
    editTd.classList.add("edit", "btn", "trigger");
    editTd.innerHTML = `<a href="editBlog.html?id=${task._id}"> <i class="fas fa-edit"></i> Edit </a>`;
    deleteTd.innerHTML = `<button title="Delete Task" class="delete" data-task-id="${task._id}" onclick="deleteTask()"><i class="fas fa-trash-alt"></i> Delete</buttton>`;

    tr.appendChild(deleteTd);
    tr.appendChild(editTd);
    tbody.appendChild(tr);
  });
};
fetchTasks();
function deleteTask() {
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
    loder.style.display = "block";
    taskIds.forEach(async (e) => {
      console.log(e);
      try {
        const url = `https://mybrand-backend-j767.onrender.com/api/blogs/delete/${e}`;
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        loder.style.display = "none";
        if (!response.ok) {
          const message = await response.json();
          alert(message);
        }
        loder.style.display = "none";
        const message = await response.json();
        alert(message);
        window.location.href = "blogs.html";
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    });
  }
}

function editTask() {
  const token = localStorage.getItem("token");
  if (token == null) {
    alert("Your Token is Expired");
    window.location.href = "index.html";
    return;
  }

  const edit = document.querySelector(".editingForm");
  const checkboxes = document.querySelector(
    'input[name="taskCheckbox"]:checked'
  );
  const result = checkboxes.getAttribute("data-task-id");
  const currentValue = result;
  const single = `https://mybrand-backend-j767.onrender.com/api/blogs/read/${currentValue}`;

  async function fetchBlogPost(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const title = document.getElementById("blogTitle");
        const content = document.getElementById("blogContent");
        const fetched = await response.json();
        title.value = fetched.title;
        content.innerText = fetched.content;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
  fetchBlogPost(single);

  edit.style.transition = "opacity 0.5s ease-in-out";
  edit.style.opacity = "1";
  edit.style.display = "inline";

  document
    .getElementById("editingForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData();

      const imageFile = document.getElementById("imageInput").files[0];
      const title = document.getElementById("blogTitle").value;
      const content = document.getElementById("blogContent").value;

      formData.append("image", imageFile);
      formData.append("title", title);
      formData.append("content", content);

      try {
        const response = await fetch(
          `https://mybrand-backend-j767.onrender.com/api/blogs/edit/${currentValue}`,
          {
            method: "put",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create blog");
        }
        const newBlogPost = await response.json();
        alert(newBlogPost);
        window.location.href = "viewBlogs.html";
      } catch (error) {
        alert("Error updating blog post:", error);
      }
    });
}
