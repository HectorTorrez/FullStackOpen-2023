import { Person } from "./Person"

// eslint-disable-next-line react/prop-types
export const Persons = ({numbers}) => {
  return (
    <>
    {
        // eslint-disable-next-line react/prop-types
        numbers.map((person) => {
            return <Person key={person.id} {...person}/>
        })
    }
    </>
  )
}