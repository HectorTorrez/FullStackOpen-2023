import axios  from "axios";

export const getPersons = async() => {
        try {
           return axios.get(' http://localhost:3001/persons')
           .then(response => {
            return response
           })

        } catch (error) {
            console.log(error)
        }
}