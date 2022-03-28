
function formatDate(timestamp)
{
let date = new Date(timestamp);
let hours = date.getHours();
if( hours<10){
    hours= `0${hours}`
}
let minutes = date.getMinutes();
if (minutes <10){
    minutes = `0${minutes}`;
}
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function displayForecast(){
    let forecastElement = document.querySelector("#weather-forecast");

    let forecastHTML= `<div class="row">`;
    let days = [ "Tue","Wed","Thur","Fri","Sat","Sun"];
    days.forEach(function(day){
    forecastHTML = 
    forecastHTML + `
         <div class="col-2"> 
            <div class="weather-forecast-date">
              ${day}
            </div>
              <img src="https://ssl.gstatic.com/onebox/weather/64/rain_light.png" alt="" width="40"/>
            <div class="weather-forecast-temp"> 
              <span class="weather-forecast-temp-max">18°</span>|<span class="weather-forecast-temp-min">12°</span> 
            </div>
            </div>`;
        });

        forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML= forecastHTML;
}



function displayTemperature(response)
{
celsiusTemperature = response.data.main.temp;
let cityElement = document.querySelector("#city");
let tempElement =document.querySelector("#temperature");
let description = document.querySelector("#condition");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector(".icon")

cityElement.innerHTML= response.data.name;
tempElement.innerHTML= Math.round(celsiusTemperature);
description.innerHTML= response.data.weather[0].description;
humidityElement.innerHTML=response.data.main.humidity;
windElement.innerHTML= Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt*1000);
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}

function search (city){
let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
 
}

function handleSubmit(event){
event.preventDefault();
let cityInputElement = document.querySelector("#searchCity");
search(cityInputElement.value)
}


 
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showFahrenheitTemp(event){
    event.preventDefault();
    celLink.classList.remove("active");
    fahLink.classList.add("active");
   let fahrenheitTemp= (celsiusTemperature* 9)/5 + 32;
let tempElement = document.querySelector("#temperature");
tempElement.innerHTML= Math.round(fahrenheitTemp);
}
function showCelsiusTemp(event){
    event.preventDefault();
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML= Math.round(celsiusTemperature);
    celLink.classList.add("active");
    fahLink.classList.remove("active");
}
let celsiusTemperature = null;


let fahLink = document.querySelector("#fah-link");
fahLink.addEventListener("click",showFahrenheitTemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click",showCelsiusTemp);

search("Harare");
displayForecast();