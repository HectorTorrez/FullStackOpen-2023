import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { FormToCreateBlog } from './components/FormToCreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const getUser = await blogService.login({username, password})
       localStorage.setItem('token', JSON.stringify(getUser))
       blogService.setToken(getUser.token)
      setUser(getUser)
    } catch (error) {
      console.log(error)
    }
  }

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs( blogs )
  }


  useEffect(() => {
    getBlogs()
    const token = localStorage.getItem('token')
    if(token){
      const user = JSON.parse(token)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  if(user === null){
    return (
      <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">
          <input type="text" name='username' value={username} onChange={(e)=> setUsername(e.target.value)}/>
        </label>
        <label htmlFor="password">
          <input type="password" name="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
        </label>
        <button>send</button>
      </form>
    </div>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <FormToCreateBlog/>
      <p>{user.name} <button onClick={handleLogout}>log out</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App