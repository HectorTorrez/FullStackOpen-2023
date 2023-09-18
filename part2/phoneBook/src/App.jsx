import { useState } from "react"
import { Filter } from "./components/Filter"
import { PersonForm } from "./components/PersonForm"
import { Persons } from "./components/Persons"

export const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filterByName, setFilterByName] = useState('')


 

  const numbers = persons.filter(person => {
    const byName =  person.name.toLowerCase().includes(filterByName.toLowerCase())
    return byName
  })


  return (
    <section>
      <h2>Phonebook</h2>
        <Filter setFilterByName={setFilterByName}/>
        <h3>Add a new</h3>
        <PersonForm setPersons={setPersons} persons={persons}/>
        <h2>Numbers</h2>
       <Persons numbers={numbers}/>
    </section>
  )
}