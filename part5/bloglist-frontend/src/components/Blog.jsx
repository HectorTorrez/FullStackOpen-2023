const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} 
    <br />
    <a href={blog.url}>{blog.url}</a>
  </div>  
)

export default Blog