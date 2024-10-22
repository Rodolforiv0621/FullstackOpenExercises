import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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