import { createNewPost } from "./createNewPost.mjs";

export function listenNewPost() {
  const form = document.querySelector(".bidform");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    let formData = document.getElementById("bidInput").value;

    createNewPost(formData);
  });
}

listenNewPost();
