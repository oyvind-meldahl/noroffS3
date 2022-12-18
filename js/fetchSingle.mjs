import { baseURL } from "./baseVariables.mjs";
import { options } from "./baseVariables.mjs";
import { displaySingle } from "./displaySingle.mjs";

let urlPost = window.location.search;
const urlParams = new URLSearchParams(urlPost);
let objectID = urlParams.get("id");

localStorage.setItem("objectID", objectID);

export async function fetchSinglePost() {
  const results = await fetch(
    baseURL + "listings/" + objectID + "?_seller=true&_bids=true",
    options,
    {
      method: "GET",
    }
  );
  const jsonResults = await results.json();

 
displaySingle(jsonResults)
}

fetchSinglePost()
