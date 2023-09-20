import { useState } from "react"
import { createPerson } from "../services/phonebook"

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

          createPerson(newPerson).then(response => {
            setPersons([...persons, response])
          })
          .catch(error => {
            alert(error.message)
          })
          .finally(
            setNewName(''), setNewNumber('')
          )
          

          
      }

  return (
    <form onSubmit={handleCheck}>
        <div>
          name: <input type="text" name="name" value={newName} onChange={(e)=> setNewName(e.target.value)} />
        </div>
        <div>
          number: <input type="text" name="number" value={newNumber} onChange={(e)=> setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}