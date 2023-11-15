import { useEffect, useState } from "react";

import Forecast from "./components/Forecast";
import Location from "./components/Location";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import Loader from "./components/Loader";

function App(){
  const [location,setLocation] = useState("Chandigarh");
  const [city,setCity] = useState({});
  const [currWeather,setCurrWeather] = useState({});
  const [dailyWeather,setDailyWeather] = useState({});
  const [loader,setLoader] = useState(false);

  useEffect(function(){
    async function fetchWeather(){
      try {
        setLoader(true);

        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
        const geoData = await geoRes.json();

        if(!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country } = geoData.results.at(0);
        setCity({name,country});

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&current=temperature_2m,rain,wind_speed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset`
        );
        const weatherData = await weatherRes.json();

        const currData ={
          temp:weatherData.current.temperature_2m,
          rain:weatherData.current.rain,
          wind:weatherData.current.wind_speed_10m,
          code:weatherData.daily.weathercode.at(0),
          sunrise:weatherData.daily.sunrise.at(0),
          sunset:weatherData.daily.sunset.at(0),
          high:weatherData.daily.temperature_2m_max.at(0),
          low:weatherData.daily.temperature_2m_min
          .at(0)
        }

        setCurrWeather(currData);
        setDailyWeather(weatherData.daily);
      } catch (error) {
        console.error(error);
      }finally{
        setLoader(false);
      }
    }

    fetchWeather();
  },[location]);


  return(
    <div className="app">
      <h2 className="logo">WeatherWise</h2>

      <SearchBar location={location} setLocation = {setLocation}/>

      {
      loader ?
        <Loader /> : 
        <>
          {dailyWeather.time && <Location city={city}/>}
          {currWeather.temp && <Weather currWeather={currWeather}/>}
          {dailyWeather.time && <Forecast dailyWeather={dailyWeather}/>}
        </>
        }
    </div>
  );
}

export default App
