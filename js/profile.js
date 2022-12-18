import { baseURL } from "./baseVariables.mjs";
import { options } from "./baseVariables.mjs";

let urlPost = window.location.search;
const urlParams = new URLSearchParams(urlPost);
let urlID = urlParams.get("id");

const updatebutton = document.querySelector(".changeimage")
const updateSubmit = document.querySelector(".updatebuttonsubmit")
const updateCancel = document.querySelector(".updatebuttoncancel")
const updateArea = document.querySelector(".updateavatar")
const textArea = document.querySelector(".profileboxtext")
const imageArea = document.querySelector(".profileboximage")

if(urlID === localStorage.getItem("username") || urlID === null) {
  updatebutton.style.display = "block"
} else {
  updatebutton.style.display = "none"
}

updatebutton.addEventListener("click", avatarFunction)
updateSubmit.addEventListener("click", event => {
  event.preventDefault()
  submitNewAvatar()
})
updateCancel.addEventListener("click", cancelNewAvatar)



async function submitNewAvatar() {
  const avatarInput = document.querySelector(".avatarinput").value
  console.log(avatarInput)
  const result = await fetch(baseURL + "profiles/" + urlID + "/media", {
    method: "PUT",
    body: JSON.stringify({
      "avatar": avatarInput
    }),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "Content-type": "application/json",
    },
  });
  let jsonResults = await result.json();
}

function cancelNewAvatar() {
  updateArea.style.display = "none"
  textArea.style.display = "block"
  imageArea.style.display = "block"
}

function avatarFunction() {
  updateArea.style.display = "block"
  textArea.style.display = "none"
  imageArea.style.display = "none"

}

if (urlID == null) {
    urlID = localStorage.getItem("username")
}

localStorage.setItem("user", urlID);

export async function fetchSingleUser() {
    const results = await fetch(
      baseURL + "profiles/" + urlID + "?_listings=true",
      options,
      {
        method: "GET",
      }
    );
    const jsonResults = await results.json();
 
createHTML(jsonResults)
}

fetchSingleUser()


function createHTML(jsonResults) {

const imageSpace = document.querySelector(".profileimage")
const profileusername = document.querySelector(".profileusername")
const profilecontact = document.querySelector(".profilecontact")
const profilecredits = document.querySelector(".profilecredits")
const listingspace = document.querySelector(".profilelistings")


let image = ""
if (jsonResults.avatar === null) {
    image = ""
} else {
    image = jsonResults.avatar
}

imageSpace.innerHTML = `<img src="${image}" class="itemimageprofile">`
profileusername.innerHTML = `${jsonResults.name}`
profilecontact.innerHTML = `${jsonResults.email}`
profilecredits.innerHTML = `Credits: ${jsonResults.credits}`

jsonResults.listings.sort((b, a) => {
    let da = new Date(a.endsAt),
    db = new Date(b.endsAt);
return da - db;
})


for (let i=0; i<jsonResults.listings.length; i++) {


    let endTime = new Date(jsonResults.listings[i].endsAt)
    let today = new Date()
    let diff = endTime - today
    let secondDiff = diff / 1000
    let minuteDiff = secondDiff / 60
    let hourDiff = minuteDiff / 60
    let dailyDiff = hourDiff / 24


let finaldiff

if (diff < 0) {
  finaldiff = `EXPIRED`
} else if (secondDiff < 60) {
  finaldiff = `Less than one minute left`
}  else if (minuteDiff < 60) {
  finaldiff = `${Math.ceil(minuteDiff)} minutes left`
} else if (hourDiff < 48) {
  finaldiff = `${Math.ceil(hourDiff)} hours left`
} else if (dailyDiff > 2) {
  finaldiff = `${Math.ceil(dailyDiff)} days left`
}

let image = jsonResults.listings[i].media[0]
if (jsonResults.listings[i].media.length === 0) {
image = "/img/latest.jpeg"
}

  listingspace.innerHTML += `
    <div class="listing bg-white border-dark border mb-3 boxshadow">
      <div class="topline border-bottom border-dark">${finaldiff}</div>
      <div>
      <a href="object.html?id=${jsonResults.listings[i].id}"><img src="${image}" class="itemimage"></a>
      </div>
      <div>
        <div class="d-flex flex-column">
          <div class="fs-3 fw-bolder p-3">${jsonResults.listings[i].title.substring(0,30)}</div>
        </div>
      </div>
 
 ` 
}
}
