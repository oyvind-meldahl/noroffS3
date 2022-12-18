import { baseURL } from "./baseVariables.mjs";

const bidError = document.querySelector(".biderror");

export async function newItemFirst(passDetails) {
  passDetails.tags = ["floraplants"];
  console.log(passDetails);
  passDetails.endsAt = new Date(passDetails.endsAt).toISOString();

  passDetails.media = new Array(passDetails.media);

  if (passDetails.media2 != "" || undefined || null) {
    passDetails.media.push(passDetails.media2);
  }

  if (passDetails.media3 != "" || undefined || null) {
    passDetails.media.push(passDetails.media3);
  }

  if (passDetails.media4 != "" || undefined || null) {
    passDetails.media.push(passDetails.media4);
  }

  delete passDetails.media2;
  delete passDetails.media3;

  const results = await fetch(baseURL + "listings", {
    method: "POST",
    body: JSON.stringify(passDetails),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "Content-type": "application/json",
    },
  });

  let jsonResults = await results.json();

  bidError.style.display = "block";
  bidError.innerHTML = `${jsonResults.errors[0].message}!`;
}
