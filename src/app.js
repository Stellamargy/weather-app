//real datetime
let currentDate=new Date();
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function displayRealTime(date){
    let day=date.getDay();
    let hours=date.getHours();
    let minutes=date.getMinutes();
    //inserts datetime in html
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
//displays  datetime when the page loads.
displayRealTime(currentDate);
//continually updates the   datetime.
const updateRealTime=()=>{
    currentDate=new Date();
    displayRealTime(currentDate)
};
setInterval(updateRealTime,60000);

 //Gets current weather data and inserts in  html.
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
    weatherForecast(response.data.city);
    
   

}
//api intergration
let apiKey="bfcoa2306cb6b50a21d693ee1219t034";
function searchedCity(city){
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
//adds event listener to the search button.
let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",getCityInputValue);

//default city
searchedCity("Nairobi");

//implements Javascript template.
let weatherForecastContainer=document.querySelector("#weather-forecast");
function displayWeatherForecast(response){
   
    let weatherForecastHtml="";
    let days=["Mon","Tue","Wed","Thu","Fri"];
    response.data.daily.forEach(function(day,index){
        if (index<4){
            //formats datetime received in api into a readable state.
            let formattedDate=new Date(day.time*1000);
        let weekday=days[formattedDate.getDay()];
       weatherForecastHtml=weatherForecastHtml+`
        <div class="day-weather-forecast">
                <div class="date-time">${weekday}</div>
                <div class="day-weather-icon"> <img src="${day.condition.icon_url}" /></div>
                <div class="max-min-temp">${Math.floor(day.temperature.minimum)}º <span>${Math.floor(day.temperature.maximum)}º</span></div>
</div>
`;
        }
weatherForecastContainer.innerHTML=weatherForecastHtml;
    })
};


//api intergration for weather forecast.
function weatherForecast(city){
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
   axios.get(apiUrl).then(displayWeatherForecast);
}