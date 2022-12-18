import { newItemFirst } from "./newItemFirst.js";

export function listenNewItem() {
  const form = document.getElementById("newitem");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const passDetails = Object.fromEntries(formData.entries());
    newItemFirst(passDetails);
    
  });
}

listenNewItem()