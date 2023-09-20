import { useState } from "react"
import {  createPerson, updatePerson } from "../services/phonebook"

// eslint-disable-next-line react/prop-types
export const PersonForm = ({setPersons, persons, setNotificacion}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    
    const handleCheck = async(e) => {
      e.preventDefault()
      
      // eslint-disable-next-line react/prop-types
      const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

        const newPerson = {
          name: newName,
          number: newNumber
          }


        if(existingPerson){
          let cf = confirm(`${existingPerson.name} is already added to Phonebook, replace the old number with a new one?`)
          if(cf){
            const id = existingPerson.id
            updatePerson(id, newPerson).then(response => {
              // eslint-disable-next-line react/prop-types
              setPersons([...persons, persons.map(person => person.id !== id ? newPerson : response)])
            })
            .catch(error => {
              alert(error.message)
            })
            .finally(
              setNewName(''), setNewNumber('')
            )
          }
        }else{
          createPerson(newPerson).then(response => {
            setPersons([...persons, response.data])
           
            setNotificacion(`Added ${response.data.name}`)
            // setTimeout(() => {
            //   setNotificacion(null)
            // }, 5000);
          })
          .finally(
            setNewName(''), setNewNumber('')
          )
        }        
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