import axios from 'axios'
const baseUrl = 'http://localhost:3003'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}


const getAll = async() => {
  const request = await axios.get(`${baseUrl}/api/blogs`)
  return request.data
}

const login = async(credentials) => {
    const request = await axios.post(`${baseUrl}/api/login`, credentials)
  return request.data

}

const createBlog = async(newBlog) => {
  const config = {
    headers: {Authorization: token}
  }
  console.log(config)
  const response = await axios.post(`${baseUrl}/api/blogs`, newBlog, config)
  console.log(response)
  return response.data
}

export default { getAll, login, createBlog, setToken}