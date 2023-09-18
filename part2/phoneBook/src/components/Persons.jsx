// eslint-disable-next-line react/prop-types
export const Persons = ({numbers}) => {
  return (
    <>
    {
        // eslint-disable-next-line react/prop-types
        numbers.map((person, i) => {
            return (
                <div key={i}>
            <p>{person.name} <span>{person.number}</span> </p> 
            </div>
          )
        })
    }
    </>
  )
}