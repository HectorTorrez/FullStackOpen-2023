// eslint-disable-next-line react/prop-types
export const CountriesList = ({filter}) => {
        // eslint-disable-next-line react/prop-types
        if(filter.length === 1) return null
  return (
   <>
   {
    // eslint-disable-next-line react/prop-types
    filter.map(item => {
        return <ul key={item.name.common}><li>{item.name.common}</li></ul>
    })
   }
   </>
  )
}