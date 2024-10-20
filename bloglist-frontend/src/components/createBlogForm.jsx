import { useState } from "react"

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onSubmit = async () =>{
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
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button onClick={onSubmit}>Create</button>
    </div>
  );
};

export default CreateBlogForm