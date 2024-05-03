const url = "https://mybrand-backend-j767.onrender.com/api/blogs/read";
// Assuming data is an array of objects containing blog post information

const loader = document.getElementById("loader");
loader.style.display = "none";
async function fetchAndRenderBlogPosts() {
  loader.style.display = "block";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tok}`,
      },
    });
    const data = await response.json();
    console.log(data);
    const container = document.querySelector(".blogBox");

    data.forEach((blogPost) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");

      const image = document.createElement("img");
      image.src = blogPost.imageUrl;
      image.alt = "Blog Post Image";

      cardHeader.appendChild(image);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const title = document.createElement("h4");
      title.innerHTML = blogPost.title;

      const content = document.createElement("p");
      content.innerHTML = blogPost.content;

      cardBody.appendChild(title);
      cardBody.appendChild(content);

      card.appendChild(cardHeader);
      card.appendChild(cardBody);

      container.appendChild(card);
      card.addEventListener("click", (e) => {
        window.location.href = `openingBlog.html?id=${blogPost._id}`;
      });
    });
    loader.style.display = "none";
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
}

// Call the function to fetch and render blog posts
fetchAndRenderBlogPosts();
