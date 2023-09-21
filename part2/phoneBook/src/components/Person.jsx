import { deletePerson } from "../services/phonebook"

export const Person = (props) => {

    // eslint-disable-next-line react/prop-types
    const {name, number, id, setError} = props

    const handlerDelete = (id) => {
        let cf = confirm(`Delete ${name}`)
            if(cf){
                deletePerson(id).then(response => console.log(response)).catch(error => console.log(error))
                setTimeout(() => {
                    setError(null)
                }, 5000);
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