function editblog() {
  const loder = document.getElementById("loader");
  loder.style.display = "none";
  const edit = document.getElementById("editingForm");
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const single = `https://mybrand-backend-j767.onrender.com/api/blogs/read/${blogId}`;
  loder.style.display = "block";
  async function fetchBlogPost(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const fetched = await response.json();
        console.log(fetched);
        title.value = fetched.title;
        content.innerHTML = fetched.content;
      }
      loder.style.display = "none";
    } catch (error) {
      //   console.error("Fetch error:", error);
    }
  }
  fetchBlogPost(single);
  //   });
  edit.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData();

    const imageFile = document.getElementById("imageInput").files[0];
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("content", content);
    loder.style.display = "block";
    try {
      const response = await fetch(
        `https://mybrand-backend-j767.onrender.com/api/blogs/edit/${blogId}`,
        {
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        loder.style.display = "none";
        throw new Error("Failed to create blog");
      }
      const newBlogPost = await response.json();
      alert(newBlogPost);
      loder.style.display = "none";
      window.location.href = "blogs.html";
    } catch (error) {
      alert("Error updating blog post:", error);
    }
  });
}
editblog();
