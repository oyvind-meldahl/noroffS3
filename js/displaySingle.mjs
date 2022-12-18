let urlPost = window.location.search;
const urlParams = new URLSearchParams(urlPost);
let urlID = urlParams.get("id");
import { baseURL } from "./baseVariables.mjs";

localStorage.setItem("postID", urlID);

let itemHTML = document.querySelector(".singleitemcontainer");

export function displaySingle(jsonResults) {


  let bidArray = jsonResults.bids


if (jsonResults.bids.length === 0){
 bidArray.push({bidderName: "No bids yet", amount: "0"})
} else {

bidArray.sort(function(b, a){
  return a.amount - b.amount;
});
}


let timeLeft = document.querySelector(".itemtopline")

var x = setInterval(function() {

  let endTime = new Date(jsonResults.endsAt)
  let today = new Date().getTime()
  let diff = endTime - today

  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days == 0) {
    timeLeft.innerHTML = `Ends in ${hours}h 
    ${minutes}m  ${seconds}s `;
  } else if (days == 0 && hours == 0) {
    timeLeft.innerHTML = `Ends in ${minutes}m  ${seconds}s `;
  } else if (days == 0 && hours == 0 && minutes == 0) {
    timeLeft.innerHTML = `Ends in ${seconds}s `;
  } else {
    timeLeft.innerHTML = `Ends in ${days}d ${hours}h 
    ${minutes}m  ${seconds}s `;
  }
  
  if (diff < 0) {
    clearInterval(x);
    timeLeft.innerHTML = "EXPIRED";
  }
}, 1000); 

const bigcardImage = document.querySelector(".bigcardleftmain")
const bigcardText = document.querySelector(".bigcardright")
const imageGallery = document.querySelector(".imagescontainer")

for (let i=0; i<jsonResults.media.length; i++) {
  imageGallery.innerHTML += `<a href="${jsonResults.media[i]}"><img src="${jsonResults.media[i]}" class="gallery my-3"></a>`
}

if (jsonResults.media[0] === undefined) {
  bigcardImage.innerHTML = `<div class="image">
  <img src="https://i.giphy.com/media/Qxkf4LQ1xIbXpH8z0I/giphy.webp" class="w-100">
  
  </div>`
} else {
  bigcardImage.innerHTML = `<div class="image"><a href="${jsonResults.media[0]}">
<img src="${jsonResults.media[0]}" class="w-100">
</a>
</div>`
}

bigcardText.innerHTML = `<div class="p-2 d-flex flex-column">
<div class="fs-1 fw-bold">${jsonResults.title}</div> 
<div class="fs-5">${jsonResults.description}</div>

<div class="fs-5 fw-bold mt-5">Current bid: € ${bidArray[0].amount} </div>

</div>
<div class="p-3 ms-auto">Item is sold by <a href="/profile.html?id=${jsonResults.seller.name}">${jsonResults.seller.name}</a> <img src="${jsonResults.seller.avatar}" class="sellerimage border-dark border"></div>

`

const bidhistoryHTML = document.querySelector(".bidcontainerrigth")

for (let i=0; i< bidArray.length; i++) {
  bidhistoryHTML.innerHTML += `
<div class="d-flex flex-row justify-content-between">
  <div class="bidname">${bidArray[i].bidderName}</div>
  <div class="bidhistoryvalue">€ ${bidArray[i].amount}</div>
  </div>
  `
}

const deleteAuction = document.querySelector(".auctiondelete")
const bidcontainer = document.querySelector(".bidcontainerinner")

if (jsonResults.seller.name === localStorage.getItem("username")) {
  deleteAuction.style.display = "block"
  deleteAuction.innerHTML = `<div class="bid text-center fs-2 fw-bold mb-3">
  Remove auction?
</div>
<div><p>By clicking the button below, the auction will be deleted. This action is final and can not be undone.</p>
<p>If you are certain, go ahead and click the button.</p>
</div>
<button class="btn btn-lg mt-3 w-50 button fw-bolder deletebutton">REMOVE</button>
`

const deletebutton = document.querySelector(".deletebutton")
deletebutton.addEventListener("click", removeAuction)
bidcontainer.style.display = "none"
}
}

async function removeAuction() {
  const deleteResults = await fetch(baseURL + "listings/" + urlID, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  window.location.assign("/listings.html");
}