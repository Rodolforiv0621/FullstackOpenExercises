import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const IndividualBlog = () => {
    const blogs = useSelector(state => state.blogs)

    const blogId = useParams().blogId
    const blog = blogs.find(blog => blog.id === blogId)
    if (!blog) {
      return <div>Blog not found</div>
    }
    return (
        <div>
            <h2>{blog.title}</h2>
            
        </div>
    )
}

export default IndividualBlog