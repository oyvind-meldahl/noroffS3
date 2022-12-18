import { baseURL } from "./baseVariables.mjs";

let urlPost = window.location.search;
const urlParams = new URLSearchParams(urlPost);
let urlID = urlParams.get("id");

const bidError = document.querySelector(".biderror");

export async function createNewPost(formData) {
  const results = await fetch(baseURL + "listings/" + urlID + "/bids", {
    method: "POST",
    body: JSON.stringify({ amount: Number(formData) }),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "Content-type": "application/json",
    },
  });

  const jsonResults = await results.json();

  if (jsonResults.statusCode != 400) {
    window.location.reload();
  } else {
    console.log(jsonResults.errors[0].message);
    bidError.style.display = "block";
    bidError.innerHTML = `${jsonResults.errors[0].message}!`;
  }
}
