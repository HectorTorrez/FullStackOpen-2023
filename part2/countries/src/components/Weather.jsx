import axios from "axios"
import { useEffect, useState } from "react"

const api_key = import.meta.env.VITE_SOME_KEY

// eslint-disable-next-line react/prop-types
export const Weather = ({capital}) => {
    const [weather, setWeather] = useState([])

    useEffect(()=>{
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=imperial`).then(response => setWeather([response.data]))
      },[capital])

  return (
    <>
    {
          weather.map(item => {
            return(
                <div key={item.id}>
                    <p>Temperature: {item.main.temp} Celcius</p>
                    <div>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                    </div>
                    <p>wind: {item.wind.speed} m/s</p>
                </div>
            )
        })
    }
    </>
  )
}