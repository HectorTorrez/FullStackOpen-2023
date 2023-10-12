import { useState } from "react"
import blogService from '../services/blogs'
export const FormToCreateBlog = () => {
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        url:''
    })

    

    const handleChange = (e) => {
        const {name, value} = e
        setBlog(
            {
                ...blog,
                [name]: value
            }
        )
    }

   const handlePost = async(e) => {
    e.preventDefault()
    const {name} = e
    try {
        await blogService.createBlog(blog)
        setBlog(
            {
                title: '',
                author: '',
                url:''
            }
        )
    } catch (error) {
        console.log(error)
    }finally{
        location.reload()

    }
   }
  return (
    <form onSubmit={handlePost} action="POST">
        <label htmlFor="title">
            title
            <input onChange={(e) => handleChange(e.target)} value={blog.title} type="text" name="title" id="title" />
        </label>
        <label htmlFor="author">
            author
            <input onChange={(e) => handleChange(e.target)} value={blog.author} type="text" name="author" id="author" />
        </label>
        <label htmlFor="url">
            url
            <input onChange={(e) => handleChange(e.target)} value={blog.url} type="text" name="url" id="url" />
        </label>
        <button >Send</button>
    </form>
  )
}