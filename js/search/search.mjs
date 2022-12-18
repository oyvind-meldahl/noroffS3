import { handleNameControlInput } from "./controlSearch.mjs";

function createSearchResults(searchDB) {
  let form = document.getElementById("searchform");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = nameControl.value.toLowerCase();

    handleNameControlInput(inputValue, searchDB);
  });
  const nameControl = document.getElementById("searchfield");
}
