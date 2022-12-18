const errorField = document.querySelector(".errormsg");

export function checkLoginSuccess(jsonResults) {
  if (jsonResults.accessToken) {
    window.location.replace("/profile.html");
    console.log("success");
  } else {
    errorField.innerHTML = `${jsonResults.errors[0].message}`;
    errorField.style.display = "block";
  }
}
