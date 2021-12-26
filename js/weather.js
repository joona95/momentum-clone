import { API_KEY } from "./const.js";

function onGeoSuccess(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr` // units를 통해서 화씨를 섭씨로 변경
    fetch(url).then(response => response.json()).then(data => {
        const weatherContent = document.querySelector("#weather");
        const i = document.createElement("i");
        const icon = 'wi-owm-'+data.weather[0].id;
        i.classList.add("wi");
        i.classList.add(icon);
        weatherContent.appendChild(i);
        const temperature = document.createElement("span");
        temperature.innerText = ` ${data.main.temp}℃`;
        temperature.style.fontSize="20px";
        weatherContent.appendChild(temperature);
        const info = document.createElement("p");
        info.innerText = `${data.weather[0].main} / ${data.name}`;        
        weatherContent.appendChild(info);
    }); 
}

function onGeoError(){
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
