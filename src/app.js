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
function getWeatherData(response){
    console.log(response.data);
    let weatherDescriptionElement=document.querySelector("#weather-description");
    let weatherHumidityElement=document.querySelector(".weather-humidity");
    let weatherWindElement=document.querySelector(".weather-speed");
    let weatherTemp=document.querySelector(".weather-temp");
    weatherTemp.innerHTML=`${Math.floor(response.data.temperature.current)}`;
    weatherDescriptionElement.innerHTML=`${response.data.condition.description}`;
    weatherHumidityElement.innerHTML=`${response.data.temperature.humidity}%`;
    weatherWindElement.innerHTML=`${response.data.wind.speed}km\h`;



}
function getCityInputValue(event){
    //stop the page from reloading
    event.preventDefault()
    let cityInputElement=document.querySelector(".city-input").value;
    let h1=document.querySelector("h1");
    h1.innerHTML=cityInputElement
    //api intergration
    let apiKey="bfcoa2306cb6b50a21d693ee1219t034";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${cityInputElement}&key=${apiKey}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(getWeatherData)
}
let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",getCityInputValue);