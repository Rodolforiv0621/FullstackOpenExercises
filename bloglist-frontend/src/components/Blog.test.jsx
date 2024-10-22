import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'




test('renders content', () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Ro",
    url: "youtube.com",
    likes: 12,
    currentUser: false
  }

  render(< Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library Ro')
  expect(element).toBeDefined()
})

test('does not render likes or url by default', ()=>{
    const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Ro",
    url: "youtube.com",
    likes: 12,
    currentUser: false
  }

  render(< Blog blog={blog} />)

  const element = screen.queryByText('youtube.com')
  expect(element).toBeNull()
})

test('url and likes are shown after clicking show', async ()=>{
    const blog = {
      title: "Component testing is done with react-testing-library",
      author: "Ro",
      url: "youtube.com",
      likes: 12,
      currentUser: false,
    };

    render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = screen.getByText('youtube.com')
    const div2 = screen.getByText(12)
    expect(div).toBeDefined()
    expect(div2).toBeDefined()
})

test("tests clicking like button twice", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Ro",
    url: "youtube.com",
    likes: 12,
    currentUser: false,
  };
  const mockHandler = vi.fn();

  render(<Blog blog={blog} handleUpdateLikes={mockHandler}/>);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  const likeButton = screen.getByText("like");
  await user.click(likeButton)
  await user.click(likeButton)
  
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('test create blog props recieved', async ()=>{
    const mockHandler = vi.fn();

    render(<CreateBlogForm createBlog={mockHandler} />)

    const user = userEvent.setup();

    const titleInput = screen.getByPlaceholderText('Write title')
    const authorInput = screen.getByPlaceholderText('Write author name')
    const urlInput = screen.getByPlaceholderText('Write url')
    const button = screen.getByText('Create')

    await user.type(titleInput, 'The great world series')
    await user.type(authorInput, 'Ro')
    await user.type(urlInput, 'youtube.com')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toBe('The great world series')
    expect(mockHandler.mock.calls[0][1]).toBe("Ro")
    expect(mockHandler.mock.calls[0][2]).toBe("youtube.com")

    // expect(mockHandler.mock.calls[0][0].content).toBe("testing a form...");
})
