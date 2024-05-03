const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");
console.log("Blog ID:", blogId);
const content = document.getElementById("content");
const image = document.getElementById("image");
const loader = document.getElementById("loader");
loader.style.display = "none";
const url = `https://mybrand-backend-j767.onrender.com/api/blogs/read/${blogId}`;
const title = document.getElementById("title");
async function reading(url, token) {
  loader.style.display = "block";
  try {
    const readBlog = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tok}`,
      },
    });
    loader.style.display = "none";
    const data = await readBlog.json();
    title.innerHTML = data.title;
    image.src = data.imageUrl;

    content.innerHTML = data.content;
    return data;
  } catch (error) {
    console.error("Error reading blog:", error);
    throw error; // You may want to handle the error or propagate it further
  }
}
reading(url, tok);
