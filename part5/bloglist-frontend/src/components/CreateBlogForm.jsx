import { useState } from 'react'
import { Button } from 'react-bootstrap'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = async () => {
    await createBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New Blog</h2>

      <div>
        title:
        <input
          type="text"
          name="title"
          value={title}
          data-testid='title'
          placeholder='Write title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="author"
          value={author}
          data-testid='author'
          placeholder='Write author name'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          value={url}
          data-testid='url'
          placeholder='Write url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button variant='primary' onClick={onSubmit}>Create</Button>
    </div>
  )
}

export default CreateBlogForm