import { baseURL } from "./baseVariables.mjs";
import { options } from "./baseVariables.mjs";
import { displayManyPosts } from "./displayMany.mjs";
import { handleNameControlInput } from "./search/controlSearch.mjs";

export async function fetchManyPosts() {
  const results = await fetch(
    baseURL +
      "listings?limit=100&_seller=true&_active=true&_bids=true&sort=endsAt&sortOrder=asc",
    options,
    {
      method: "GET",
    }
  );

  const jsonResults = await results.json();

  displayManyPosts(jsonResults);
  createSearchResults(jsonResults);
}

fetchManyPosts();

function createSearchResults(jsonResults) {
  let form = document.getElementById("search");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = nameControl.value.toLowerCase();

    handleNameControlInput(inputValue, jsonResults);
  });
  const nameControl = document.getElementById("searchInput");
}
