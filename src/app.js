//Getting real time
let currentDate=new Date();
let days=["Sunday","Monday","Tuesday","Wednesday","Thursaday","Friday","Saturday"];

function displayRealTime(date){
    let day=date.getDay();
    let hours=date.getHours();
    let minutes=date.getMinutes();
    //inserting real time in html
    let realTimeElement=document.querySelector("#real-time");
    if (hours<10){
        realTimeElement.innerHTML=`${days[day]} ${0}${hours}:${minutes},`
    }else if(minutes<10){
        realTimeElement.innerHTML=`${days[day]} ${hours}:${0}${minutes},`
    }else{
        realTimeElement.innerHTML=`${days[day]} ${hours}:${minutes},`
    }
    
}

displayRealTime(currentDate);
function getCityInputValue(event){
    //stop the page from reloading
    event.preventDefault()
    let cityInputElement=document.querySelector(".city-input");
    let h1=document.querySelector("h1");
    h1.innerHTML=cityInputElement.value
}
let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",getCityInputValue)