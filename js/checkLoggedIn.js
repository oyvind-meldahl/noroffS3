const buttonLogin = document.querySelector(".login")
const buttonLogout = document.querySelector(".logout")
const buttonProfile = document.querySelector(".profile")
const buttonCreateNew = document.querySelector(".createnew")

buttonLogout.addEventListener("click", logout)


let loggedIn = false

if (localStorage.getItem("username")) {
    loggedIn = true
}

if (loggedIn) {
buttonLogin.style.display = "none"

} else {
    buttonLogout.style.display = "none"
    buttonCreateNew.style.display = "none"
    buttonProfile.style.display = "none"
}

function logout() {
    localStorage.clear()
    location.assign("/index.html")
    console.log("logged out")
}