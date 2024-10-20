import { useState, useEffect } from 'react'
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
  
  
  
  useEffect(() => {
    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  
    if (loggedUserJSON && loggedUserJSON !== "undefined") {
      let user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      getAllBlogs();
    }
    
  }, [])

  const getAllBlogs = () =>{
    
    blogService.getAll().then(blogs =>{
      if(blogs === 'error'){
        setdisplayMessage({
          message: `Invalid JWT token, sign out and sign back in`,
          color: "red",
        });
        setTimeout(() => {
          setdisplayMessage(null);
        }, 4000);
      }
      setBlogs( blogs )
    })  
    
    
  }
  
  const handleLogin = async (e) =>{
    e.preventDefault();
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
        message: `Wrong username or password`,
        color: "red",
      });
      setTimeout(() => {
        setdisplayMessage(null);
      }, 4000);
    }
    
    
  }

  const handleCreateBlog = async (title, author, url) => {
    if(title === '' || author === '' || url === '') return
    try{
      const newBlog = blogService.create(title, author, url)
      setdisplayMessage({
        message: `a new blog ${title} by ${author} added`,
        color: 'green'
      })
      setTimeout(() => {
        setdisplayMessage(null);
      }, 4000);
    }catch(e){
      setdisplayMessage({
        message: "Could not create new blog",
        color: 'red'
      })
      setTimeout(() => {
        setdisplayMessage(null);
      }, 4000);
    }
  }

  const loginForm = () =>{
    return (
      
      <form onSubmit={handleLogin}>
        <h2>Log in</h2>
        <Message errorMessage={displayMessage} />
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
     
    );
  }

  const createBlogForm = () =>{

    return(
      <Togglable buttonLabel={"Create Blog"}>
        <CreateBlogForm 
          createBlog = {handleCreateBlog}
        />
      </Togglable>
    )
  }

  const blogForm = () =>{
    return (
      <div>
        <h2>blogs</h2>
        <Message errorMessage={displayMessage} />
        <div>
          {" "}
          {user.name} logged in
          <button
            onClick={() => {
              window.localStorage.removeItem("loggedBlogappUser");
              window.location.reload();
            }}
          >
            logout
          </button>
          <br />
          <br />
        </div>
        {createBlogForm()}
        {blogs.map((blog) => (
          <div>
            <Blog key={blog.id} blog={blog} /><button>View</button>
            
          </div>
          
        ))}
      </div>
    );
  }

  return (
    <div>
    {user === null ? loginForm() : blogForm()}
    </div>
  )
}

export default App