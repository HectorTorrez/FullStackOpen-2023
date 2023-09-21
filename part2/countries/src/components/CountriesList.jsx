import { useState } from "react"
import { Country } from "./Country"

// eslint-disable-next-line react/prop-types
export const CountriesList = ({filter, setCountryToShow, countryToShow}) => {
    const [show, setShow] = useState(false)
        // eslint-disable-next-line react/prop-types
        if(filter.length === 1) return null
  return (
   <section className="country">
   {
    // eslint-disable-next-line react/prop-types
        filter.map(item => {
            return (
                <section key={item.name.common}>
                <p>{item.name.common}</p>
                <div>
                    <button onClick={() => setCountryToShow([item],setShow(!show) )}>Show</button>
                </div>
                </section>
            )
        })
    }
        <section>
        {
            // eslint-disable-next-line react/prop-types
            show ? countryToShow.map(item => (<Country key={item.name.common} name={item.name.common} capital={item.capital} area={item.area} languages={item.languages} img={item.flags.png}/>)) : null
        }
        </section>
   </section>
  )
}
{/* {
    show ?  : null
} */}