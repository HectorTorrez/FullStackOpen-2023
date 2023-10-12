import { useState } from "react"
import blogService from '../services/blogs'
import { Notification } from "./Notification"
export const FormToCreateBlog = () => {
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        url:''
    })

    const [notification, setNotification] = useState(false)

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
    try {
        await blogService.createBlog(blog)
        setNotification(true)
    } catch (error) {
        console.log(error)
    }finally{
        setTimeout(() => {
            setNotification(false)
            location.reload()
            setBlog(
                {
                    title: '',
                    author: '',
                    url:''
                }
            )
        }, 300);

    }
   }
  return (
    <>
    {
        notification ? <Notification status={'success'} author={blog.author} text={blog.title}/> : null
    }
    
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
    </>
  )
}