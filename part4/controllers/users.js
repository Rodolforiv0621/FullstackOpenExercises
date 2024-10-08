const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response)=>{
    const result = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, _id: 1})

    response.status(200).json(result)
})

usersRouter.post('/', async (request, response)=>{
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
   
    const user = new User({
        username: request.body.username,
        name: request.body.name,
        passwordHash: passwordHash
    })

    const savedUser = await user.save()
   
    response.status(201).json(savedUser)
})


module.exports = usersRouter