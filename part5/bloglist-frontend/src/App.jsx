import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const getUser = await blogService.login({username, password})
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


  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App