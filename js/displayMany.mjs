const listingspace = document.querySelector(".listings")

export function displayManyPosts(jsonResults) {
  for (let i = 0; i < jsonResults.length; i++) {
    
    let bidArray = jsonResults[i].bids


    if (jsonResults[i].bids.length === 0){
     bidArray.push({bidderName: "No bids yet", amount: "0"})
    } else {
    
    bidArray.sort(function(b, a){
      return a.amount - b.amount;
    });    
    }

    let endTime = new Date(jsonResults[i].endsAt)
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


    
    let image = jsonResults[i].media[0]
    if (jsonResults[i].media.length === 0) {
    image = "/img/latest.jpeg"
}
    
let bid = "0"
 if (jsonResults[i]._count.bids != 0) {
  bid = jsonResults[i].bids[0].amount
 } 

let link = "/login.html"

if (localStorage.getItem("username")) {
  link = `object.html?id=${jsonResults[i].id}`
}


    listingspace.innerHTML += `
    <div class="listing my-2 mx-1 col-12 col-md-5 col-xl-3  bg-white d-flex flex-column h-100 border border-dark boxshadow">
    <div class="topline">${finaldiff}</div>
  <div><a href="${link}">
  <img src="${image}" class="itemimage"></a>
  </div>
  
  <div class="itemtext d-flex flex-column justify-content-between border-top border-dark p-3">
  <div class="fs-3 fw-bold"><a href="${link}">${jsonResults[i].title.substring(0,35)}</a></div>
  
  <div class="fs-5 fw-bold"><a href="${link}">Current bid: € ${bid}</a></div>

  </div>
    `
  }
}




