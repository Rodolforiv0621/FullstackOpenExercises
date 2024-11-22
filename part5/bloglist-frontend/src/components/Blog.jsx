import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleUpdateLikes, handleDeleteBlog }) => {
  const [show, setShow] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const viewDetails = () => {
    setShow(!show)
  }

  const handleLike = () => {
    handleUpdateLikes(blog)
  }

  const handleDelete = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      handleDeleteBlog(blog.id)
    }

  }

  return (
    <div style={blogStyle}>
      
        <div className='blog'>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          {/* <button onClick={viewDetails}>view</button> */}
        </div>
      
        <div>
          {blog.currentUser ? (<Button onClick={handleDelete}>remove</Button>) : (<></>)}
        </div>
      
    </div>
  )

}

export default Blog