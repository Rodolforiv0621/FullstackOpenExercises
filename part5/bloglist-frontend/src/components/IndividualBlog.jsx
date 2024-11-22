import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import blogsService from '../services/blogs'
import { setBlogs } from "../reducers/blogsReducer"
import { useState } from "react"

const IndividualBlog = () => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const blogs = useSelector(state => state.blogs)

    const blogId = useParams().blogId
    const blog = blogs.find(blog => blog.id === blogId)
    
    if (!blog) {
      return <div>Blog not found</div>
    }
    // console.log(blog)
    const sortBlogs = (blogs) => {
        blogs = blogs.sort((a, b) => b.likes - a.likes)
        return blogs
    }

    const handleLike = async () => {
      const currentUser = blog.currentUser
      const newBlog = await blogsService.updateLikes(blog)
      let sortedBlogs = blogs
      sortedBlogs = sortedBlogs.map((blog) =>
        blog.id === newBlog.id ? { ...newBlog, currentUser: currentUser } : blog
      )
      sortedBlogs = sortBlogs(sortedBlogs)
      dispatch(setBlogs(sortedBlogs))
    }

    const addComment = async () => {
        const newBlog = await blogsService.updateComments(blogId, comment)
        const newBlogs = blogs.map(blog => blog.id === newBlog.id ? newBlog : blog)
        setComment('')

        dispatch(setBlogs(newBlogs))
    }

    return (
      <div>
        <h2>{blog.title}</h2>
        <div>
          <a href={`${blog.url}`}>{blog.url}</a>
          <div data-testid="likes">
            {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>added by {blog.author}</div>
        </div>
        <h3>Comments</h3>
        <input type="text" value={comment} onChange={(event) => setComment(event.target.value)}></input><button onClick={addComment}>add comment</button>
        <ul>
            {blog.comments.map((comment, index) => (
                // Best Practice:
                // const blogSchema = new mongoose.Schema({
                //     comments: [
                //         {
                //         id: String, // Unique ID for each comment
                //         text: String,
                //         },
                //     ],
                // })
                <li key={index}>{comment}</li>
            ))}
        </ul>
      </div>
    )
}

export default IndividualBlog