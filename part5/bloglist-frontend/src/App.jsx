import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/DisplayMessage'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/togglable'
import { showNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, setBlogs } from "./reducers/blogsReducer"
import { setUser } from './reducers/userReducer'
import Users from './components/Users'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import IndividualUser from './components/individualUser'
import IndividualBlog from './components/IndividualBlog'
import { Button, Form, Nav, Navbar } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  // const [blogs, setBlogs] = useState([])
  // const [user, setUser] = useState(null)
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()


  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON && loggedUserJSON !== 'undefined') {
      let user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
      // getAllBlogs(user)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const sortBlogs = (blogs) => {
    blogs = blogs.sort((a, b) => b.likes - a.likes)
    return blogs
  }

  // const getAllBlogs = (user) => {


  // }



  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(initializeBlogs())
    }catch(exception){
      dispatch(showNotification({
        content: 'Wrong username or password',
        color: 'red',
      }, 5000))
    }


  }

  const handleCreateBlog = async (title, author, url) => {
    if(title === '' || author === '' || url === '') return
    blogFormRef.current.toggleVisibility()
    
    try{
      let newBlog = await blogService.create(title, author, url)
      
      newBlog = { ...newBlog, currentUser: true }
      dispatch(setBlogs(blogs.concat(newBlog)))

      dispatch(showNotification({
        content: `a new blog ${title} by ${author} added`,
        color: 'green'
      }, 2500))
    }catch(e){
      dispatch(showNotification({
        content: 'Could not create new blog',
        color: 'red'
      }, 2500))
    }
  }

  const handleUpdateLikes = async (blog) => {
    const currentUser = blog.currentUser
    const newBlog = await blogService.updateLikes(blog)
    let sortedBlogs = blogs
    sortedBlogs = sortedBlogs.map(blog => blog.id === newBlog.id ? { ...newBlog, currentUser: currentUser } : blog )
    sortedBlogs = sortBlogs(sortedBlogs)
    dispatch(setBlogs(sortedBlogs))
  }

  const handleDelete = async (id) => {
    const removedBlog = await blogService.remove(id)
    let newBlogs = blogs.filter((blog) => blog.id !== removedBlog.id)
    dispatch(setBlogs(newBlogs))
  }

  const loginForm = () => {
    return (

      <Form onSubmit={handleLogin}>
        <h2>Log in</h2>
        <Message />
        <Form.Group>
        <Form.Label>
          username
          <Form.Control
            type="text"
            value={username}
            data-testid="username"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Label>
        </Form.Group>
        <Form.Group>
        <Form.Label>
          password
          <Form.Control
            type="password"
            value={password}
            data-testid="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Label>
        </Form.Group>
        <Button variant='primary' type="submit">login</Button>
      </Form>

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

  const top = () => {
    const style = {
      padding: 5
    }
    return (
      <div>
        <Message />
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className='me-auto'>
              <Nav.Link as="span">
                <Link style={style} to="/">home</Link>
              </Nav.Link>
              <Nav.Link as='span'>
                <Link style={style} to='/users'>users</Link>
              </Nav.Link>
            
            
            {' '}
            {user.name} logged in
            <Button
              onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser')
                window.location.reload()
              }}
            >
              logout
            </Button>
            </Nav>
          </Navbar.Collapse>
          
          </Navbar>
          <h2>blog app</h2>
          
        
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        {createBlogForm()}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleUpdateLikes={handleUpdateLikes} handleDeleteBlog={handleDelete}/>
        ))}
      </div>
    )
  }

  return (
    <div className='container'>
      <BrowserRouter>
      <div>
        {user ? top() : null}
      </div>
    
      <Routes>
        <Route path='/users' element={<Users/>}/>
        <Route path='/blogs/:blogId' element={<IndividualBlog />}/>
        <Route path='/users/:userId' element={<IndividualUser/>}/>
        <Route path='/login' element={loginForm()}/>
        <Route path='/' element={user === null ? loginForm() : blogForm()}/>
      </Routes>
    </BrowserRouter>
    </div>
    
    
  )
}

export default App