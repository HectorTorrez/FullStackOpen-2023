import { useEffect, useState } from "react"
import { Filter } from "./components/Filter"
import { PersonForm } from "./components/PersonForm"
import { Persons } from "./components/Persons"
import { getPersons } from "./services/phonebook"


export const App = () => {
  const [persons, setPersons] = useState([])
  const [filterByName, setFilterByName] = useState('')
  const [notification, setNotificacion] = useState(false)

  const person = async() => {
    const data = await getPersons()
    setPersons(data.data)
  }
 
  

  useEffect(()=>{
    person()
  },[])

  const numbers = persons?.filter(person => {
    const byName =  person.name?.toLowerCase().includes(filterByName.toLowerCase())
    return byName
  })

 

  return (
    <section>
      <h2>Phonebook</h2>
        <div className="phonebook">{notification}</div>
        <Filter setFilterByName={setFilterByName} />
        <h3>Add a new</h3>
        <PersonForm setPersons={setPersons} persons={persons} setNotificacion={setNotificacion}/>
        <h2>Numbers</h2>
       <Persons numbers={numbers}/>
    </section>
  )
}