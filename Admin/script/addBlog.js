const loder = document.getElementById("loader");
loder.style.display = "none";
const btn = document.getElementById("blogForm");

btn.addEventListener("submit", async (event) => {
  event.preventDefault();

  loder.style.display = "none";
  const formData = new FormData();

  const imageFile = document.getElementById("imageInput").files[0];
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  formData.append("image", imageFile);
  formData.append("title", title);
  formData.append("content", content);
  try {
    const url = "https://mybrand-backend-j767.onrender.com/api/blogs/create";
    loder.style.display = "block";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      loder.style.display = "none";
      throw new Error("Failed to create blog");
    }
    const newBlogPost = await response.json();
    alert("New blog post created:", newBlogPost);
    window.location.href = "blogs.html";
    loder.style.display = "none";
  } catch (error) {
    loder.style.display = "none";
    alert("Error creating blog post:", error);
  }
});
