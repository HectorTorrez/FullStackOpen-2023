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
    return axios.post(URL, newPerson)


}


export const deletePerson = async(id) => {
    const request =  await axios.delete(`http://localhost:3001/persons/${id}`)
    return request
}

export const updatePerson = async(id, newPerson) => {
    const request = await axios.put(`http://localhost:3001/persons/${id}`, newPerson)
    return request.data
}