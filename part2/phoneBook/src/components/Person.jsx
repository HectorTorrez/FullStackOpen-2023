import { deletePerson } from "../services/phonebook"

export const Person = (props) => {

    // eslint-disable-next-line react/prop-types
    const {name, number, id} = props

    const handlerDelete = (id) => {
        let cf = confirm(`Delete ${name}`)
        if(cf){
            deletePerson(id)
        }
    }

  
  return (
    <div>
        <p>{name} <span>{number}</span> </p> 
        <div>
            <button onClick={()=> handlerDelete(id)}>delete</button>
        </div>
     </div>
  )
}