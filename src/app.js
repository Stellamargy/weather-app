//Getting real time
let currentDate=new Date();
let days=["Sunday","Monday","Tuesday","Wednesday","Thursaday","Friday","Saturday"]
function displayRealTime(date){
    let day=date.getDay();
    let hours=date.getHours();
    let minutes=date.getMinutes();
    //inserting real time in html
    let realTimeElement=document.querySelector("#real-time");
    realTimeElement.innerHTML=`${days[day]} ${hours}:${minutes},`
}
displayRealTime(currentDate);