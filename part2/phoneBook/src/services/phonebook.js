import axios from 'axios'

const URL = 'http://localhost:3001/persons'

 export const getPersons = async() => {
    try {
       return axios.get(URL)
       .then(response => {
        return response
       })

    } catch (error) {
        console.log(error)
    }
}


export const createPerson = async(newPerson) => {
    const request = await axios.post(URL, newPerson)
    return request.data

}
