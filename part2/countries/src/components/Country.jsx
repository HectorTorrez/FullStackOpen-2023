
import { Weather } from "./Weather"

// eslint-disable-next-line react/prop-types
export const Country = ({name, capital, area, languages, img}) => {

    
  return (
    <>
        <h2>{name}</h2>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>

        <h3>Languages</h3>
        {
            Object.values(languages).map(item => {
                return <ul key={item}><li>{item}</li></ul>
            })
        }
        <div>
            <img src={img} alt={`${name} flag`} />
        </div>
        <Weather capital={capital}/>
        
    </>
  )
}