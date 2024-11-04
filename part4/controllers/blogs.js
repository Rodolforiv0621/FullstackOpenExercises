const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) =>{
  // The object in the end is mongoose syntax for the fields you want to show
  result = await Blog.find({}).populate('user', {username: 1, name: 1, _id: 1})
  response.json(result);   
})

blogsRouter.post('/', async (request, response) =>{
  let body = request.body

  const user = request.user

  let like = 'likes' in body? body.likes : 0
  // let users = await User.find({})
  // let userId = user.id
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: like,
    user: user._id
  });

  result = await blog.save()  
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result);
})

blogsRouter.delete('/:id', async (request, response)=>{
  const id = request.params.id
  
  const result = await Blog.findByIdAndDelete(id)

  response.status(200).json(result)
})

blogsRouter.put('/:id', async (request, response)=>{
  const id = request.params.id
  const likes = request.body.likes + 1
  const result = await Blog.findByIdAndUpdate(id, {likes: likes}, {new: true})
  response.status(200).json(result)
})

module.exports = blogsRouter