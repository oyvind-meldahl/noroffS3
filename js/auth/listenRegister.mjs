import { registerUser } from "./registerUser.mjs";

export function listenRegister() {
  const form = document.getElementById("registerform");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const userDetails = Object.fromEntries(formData.entries());
    if (userDetails.avatar === "") {
      delete userDetails.avatar;
    }
 
    registerUser(userDetails);
  });
}

listenRegister()