
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

function displayTemperature(response)

{
celsiusTemperature = response.data.main.temp;

let cityElement = document.querySelector("#city");
cityElement.innerHTML= response.data.name;
let tempElement =document.querySelector("#temperature");
tempElement.innerHTML= Math.round(celsiusTemperature);
let description = document.querySelector("#condition");
description.innerHTML= response.data.weather[0].description;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML=response.data.main.humidity;
let windElement = document.querySelector("#wind");
windElement.innerHTML= Math.round(response.data.wind.speed);
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(response.data.dt*1000);
let iconElement = document.querySelector(".icon")
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



search("Harare")