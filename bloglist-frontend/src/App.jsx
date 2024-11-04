import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/DisplayMessage'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [displayMessage, setdisplayMessage] =  useState(null)

  const blogFormRef = useRef()


  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON && loggedUserJSON !== 'undefined') {
      let user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs(user)
    }

  }, [])


  const sortBlogs = (blogs) => {
    blogs = blogs.sort((a, b) => b.likes - a.likes)
    return blogs
  }

  const getAllBlogs = (user) => {

    blogService.getAll().then(blogs => {
      if(blogs === 'error'){
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
      }

      blogs = sortBlogs(blogs)

      blogs = blogs.map((blog) => {

        return ({
          ...blog,
          currentUser: user && blog.user? user.username === blog.user.username : false
        })
      })

      setBlogs( blogs )
    })


  }



  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      getAllBlogs()
    }catch(exception){
      setdisplayMessage({
        message: 'Wrong username or password',
        color: 'red',
      })
      setTimeout(() => {
        setdisplayMessage(null)
      }, 2500)
    }


  }

  const handleCreateBlog = async (title, author, url) => {
    if(title === '' || author === '' || url === '') return
    blogFormRef.current.toggleVisibility()
    try{
      let newBlog = await blogService.create(title, author, url)
      console.log(newBlog)
      newBlog = { ...newBlog, currentUser: true }
      console.log(newBlog)
      setBlogs(blogs.concat(newBlog))

      setdisplayMessage({
        message: `a new blog ${title} by ${author} added`,
        color: 'green'
      })
      setTimeout(() => {
        setdisplayMessage(null)

      }, 2500)

    }catch(e){
      setdisplayMessage({
        message: 'Could not create new blog',
        color: 'red'
      })
      setTimeout(() => {
        setdisplayMessage(null)
      }, 2500)
    }
  }

  const handleUpdateLikes = async (blog) => {
    const currentUser = blog.currentUser
    const newBlog = await blogService.updateLikes(blog)
    let sortedBlogs = blogs
    sortedBlogs = sortedBlogs.map(blog => blog.id === newBlog.id ? { ...newBlog, currentUser: currentUser } : blog )
    sortedBlogs = sortBlogs(sortedBlogs)
    setBlogs(sortedBlogs)
  }

  const handleDelete = async (id) => {
    const removedBlog = await blogService.remove(id)
    setBlogs((blogs) => blogs.filter((blog) => blog.id !== removedBlog.id))
  }

  const loginForm = () => {
    return (

      <form onSubmit={handleLogin}>
        <h2>Log in</h2>
        <Message errorMessage={displayMessage} />
        <div>
          username
          <input
            type="text"
            value={username}
            data-testid="username"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            data-testid="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

    )
  }

  const createBlogForm = () => {

    return(
      <Togglable buttonLabel={'Create New Blog'} ref={blogFormRef}>
        <CreateBlogForm
          createBlog = {handleCreateBlog}
        />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Message errorMessage={displayMessage} />
        <div>
          {' '}
          {user.name} logged in
          <button
            onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser')
              window.location.reload()
            }}
          >
            logout
          </button>
          <br />
          <br />
        </div>
        {createBlogForm()}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleUpdateLikes={handleUpdateLikes} handleDeleteBlog={handleDelete}/>
        ))}
      </div>
    )
  }

  return (
    <div>
      {user === null ? loginForm() : blogForm()}
    </div>
  )
}

export default App