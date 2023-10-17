import React,{useState} from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";

export default function Weather(){
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({});
    const [loaded, setLoaded] = useState(false);


function showWeather(response){
setLoaded(true);
setWeather({
  temperature: response.data.main.temp,
  humidity: response.data.main.humidity,
  wind: response.data.wind.speed,
  description: response.data.weather[0].description,
  icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
});
}
function handleForm(event){
    event.preventDefault();
     let apiKey = "094780c710fa4efd669f0df8c3991927";
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
     axios.get(apiUrl).then(showWeather);
}
function updateCity(event){
    setCity(event.target.value);
}
let form = (
  <form onSubmit={handleForm}>
    <input type="search" placeholder="Enter a city..." onChange={updateCity} />
    <button type="submit">Enter</button>
  </form>
);
if(loaded){
    return (
      <div>
        {form} 
        <Audio
          height="80"
          width="80"
          radius="9"
          color="orange"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
        <ul>
          <li>Temperature: {Math.round(weather.temperature)} C</li>
          <li>Humidity: {weather.humidity} %</li>
          <li>Wind: {weather.wind} km/hr</li>
          <li>Description: {weather.description}</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
       
      </div>
    );
} else{
    return form;
}
    
}