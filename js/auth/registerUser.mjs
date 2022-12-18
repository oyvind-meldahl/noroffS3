import { baseURL } from "/js/baseVariables.mjs";

const errorField = document.querySelector(".errormsg");

export async function registerUser(userDetails) {
  const result = await fetch(baseURL + "auth/register", {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const jsonResults = await result.json();
  
  if (jsonResults.statusCode == 400) {
    errorField.innerHTML = `${jsonResults.errors[0].message}`
    document.querySelector(".errormsg").style.display = "block";
  } else if ((jsonResults.statusCode = 201)) {
    window.location.assign("/login.html");
  } else {
    console.log(jsonResults.statusCode);
    console.log(jsonResults.message);
  }
}
