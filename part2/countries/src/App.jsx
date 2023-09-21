import axios from "axios"
import { useEffect, useState } from "react"
import { Country } from "./components/Country"
import { CountriesList } from "./components/CountriesList"




export const App = () => {

  const [value, setValue] = useState('')
  const [countryToShow, setCountryToShow] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])



  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all/`).then(response => setCountriesToShow(response.data))
  }, [])
  
  const filter = countriesToShow.filter(item => {
    const byName = item.name.common.toLowerCase().includes(value.toLowerCase())
    return byName
  })




  return (
    <section>
      <span>Find countries</span>  <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
      <pre>
        {
          filter?.length === 1 ? filter.map(item => 
            (<Country key={item.name.common} name={item.name.common} capital={item.capital} area={item.area} languages={item.languages} img={item.flags.png}/>)) : null
        }
       {
        filter?.length > 10 ? 'Too many matches, specify another filter' : <CountriesList filter={filter} setCountryToShow={setCountryToShow} countryToShow={countryToShow} />
       }
      </pre>
    </section>
  )
}
