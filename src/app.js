//Getting real time
let currentDate=new Date();
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

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
    }else if (minutes<10 && hours<10){
        realTimeElement.innerHTML=`${days[day]} ${0}${hours}:${0}${minutes},`
    }else{
        realTimeElement.innerHTML=`${days[day]} ${hours}:${minutes},`
    }
    
}
displayRealTime(currentDate);
//updating real time
const updateRealTime=()=>{
    currentDate=new Date();
    displayRealTime(currentDate)
};
setInterval(updateRealTime,60000);

 //Getting real  weather data and inserting in  html.
 let weatherDescriptionElement=document.querySelector("#weather-description");
 let weatherHumidityElement=document.querySelector(".weather-humidity");
 let weatherWindElement=document.querySelector(".weather-speed");
 let weatherTemp=document.querySelector(".weather-temp");
 let h1=document.querySelector("h1");
 let icon=document.querySelector(".weather-icon");
function getWeatherData(response){
    h1.innerHTML=`${response.data.city}`
    weatherTemp.innerHTML=`${Math.floor(response.data.temperature.current)}`;
    weatherDescriptionElement.innerHTML=`${response.data.condition.description}`;
    weatherHumidityElement.innerHTML=`${response.data.temperature.humidity}%`;
    weatherWindElement.innerHTML=`${response.data.wind.speed}km\h`;
    icon.innerHTML=  `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;



}
//api intergration

function searchedCity(city){
    let apiKey="bfcoa2306cb6b50a21d693ee1219t034";  
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`; 
    axios.get(apiUrl).then(getWeatherData)

}

function getCityInputValue(event){
    //stop the page from reloading
    event.preventDefault()
    let cityInputElement=document.querySelector(".city-input");
    // city value
    let city=cityInputElement.value
    //api intergration
    searchedCity(city);
  
   
}

let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",getCityInputValue);


searchedCity("Nairobi");
