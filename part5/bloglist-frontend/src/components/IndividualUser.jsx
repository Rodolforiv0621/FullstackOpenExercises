import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const IndividualUser = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useParams().userId
    const userBlogs = blogs.filter(blog => blog.user.id === user)
    if (userBlogs.length === 0 || !user){
        return (
            <div>no blogs...</div>
        )
    }
    return (
        <div>
            <h3>added blogs</h3>
            <ul>
                {userBlogs.map(blog => (
                <li key={blog.id}>{blog.title}</li>
            ))}
            </ul>
            
        </div>
    )
}

export default IndividualUser