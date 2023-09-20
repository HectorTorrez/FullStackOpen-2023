import axios from "axios"
import { useState } from "react"

// eslint-disable-next-line react/prop-types
export const PersonForm = ({setPersons, persons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleCheck = async(e) => {
        e.preventDefault()
    
        // eslint-disable-next-line react/prop-types
        const filter = persons.filter(person => person.name === newName).length > 0

        if(filter) return alert(`${newName} is already added to phonebook`)
        const newPerson = {
          name: newName,
          number: newNumber
          }

            await axios.post(' http://localhost:3001/persons', newPerson)

          setPersons([
            ...persons,
            newPerson
          ])
          setNewName('')
          setNewNumber('')  
      }

  return (
    <form onSubmit={handleCheck}>
        <div>
          name: <input type="text" name="name" onChange={(e)=> setNewName(e.target.value)} />
        </div>
        <div>
          number: <input type="text" name="number" onChange={(e)=> setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}