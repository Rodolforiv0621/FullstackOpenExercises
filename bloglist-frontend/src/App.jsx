import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/displayMessage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [displayMessage, setdisplayMessage] =  useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  

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
    blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
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

  const handleCreateBlog = async ()=>{
    if(title === '' || author === '' || url === '') return
    try{
      const newBlog = blogService.create(title, author, url)
      setdisplayMessage({
        message: `a new blog ${title} by ${author} added`,
        color: 'green'
      })
    }catch(e){
      setdisplayMessage({
        message: "Could not create new blog",
        color: 'red'
      })
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
        <div>
          <h2>Create New Blog</h2>

          <div>
            title:
            <input type="text" name="title" value={title} onChange={({target}) => setTitle(target.value)}/>
          </div>
          <div>
            author:
            <input type="text" name='author' value={author} onChange={({target}) => setAuthor(target.value)} />
          </div>
          <div>
            url:
            <input type="text" name='url' value={url} onChange={({target}) => setUrl(target.value)} />
          </div>
          <button onClick={handleCreateBlog}>Create</button>
        </div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
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