import { useEffect, useState } from "react"
import { Filter } from "./components/Filter"
import { PersonForm } from "./components/PersonForm"
import { Persons } from "./components/Persons"
import { getPersons } from "./services/phonebook"
import {Notificacion} from './components/Notificacion'

export const App = () => {
  const [persons, setPersons] = useState([])
  const [filterByName, setFilterByName] = useState('')
  const [notification, setNotificacion] = useState(false)
  const [error, setError] = useState(false)

  const person = async() => {
    const data = await getPersons()
    setPersons(data.data)
  }
 
  

  useEffect(()=>{
    person()
  },[notification])

  const numbers = persons?.filter(person => {
    const byName =  person.name?.toLowerCase().includes(filterByName.toLowerCase())
    return byName
  })

 
  return (
    <section>
      <h2>Phonebook</h2>\

      {
        notification ? <Notificacion text={notification} className='phonebook'/> : null
      }
      {
        error ? <Notificacion text={error} className='error'/> : null
      }
        
        <Filter setFilterByName={setFilterByName} />
        <h3>Add a new</h3>
        <PersonForm setPersons={setPersons} persons={persons} setNotificacion={setNotificacion} setError={setError}/>
        <h2>Numbers</h2>
       <Persons numbers={numbers} setError={setError}/>
    </section>
  )
}