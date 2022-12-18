import { createSearchHtml } from "./createSearchHtml.mjs";
import { fetchManyPosts } from "../fetchMany.mjs";
const frontMain = document.querySelector(".listings")

export function handleNameControlInput(inputValue, jsonResults) {
  const nameControl = document.getElementById("searchInput");
  
  if (nameControl.value == "") {
    frontMain.innerHTML = "";
    fetchManyPosts();
  } else if (nameControl.value != "") {
    const result = jsonResults.filter((jsonResults) => {
      if (jsonResults.title.toLowerCase().includes(inputValue)) {
        return true;
      }
    });
    createSearchHtml(result);
  } 
}
