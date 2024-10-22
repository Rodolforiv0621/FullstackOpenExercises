import { useState } from 'react'

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
      {show ? (
        <div className='blog'>
          {blog.title} {blog.author} <button onClick={viewDetails}>View</button>
        </div>
      ) : (
        <div>
          <div>
            {blog.title} <button onClick={viewDetails}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author}</div>
          {blog.currentUser ? (<button onClick={handleDelete}>remove</button>) : (<></>)}
        </div>
      )}
    </div>
  )

}

export default Blog