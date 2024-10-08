const {test, after} = require("node:test")
const assert = require("node:assert");
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index');
const { application } = require("express");

const api = supertest(app)


test('api blogs are returned as json', async ()=>{
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

test('api correct amount of posts are returned', async ()=>{
    let response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body.length, 2)
})

test('id is the unique identifier', async ()=>{
    let result = await api.get('/api/blogs')
    
    let blog = result.body[0]
    assert.strictEqual('id' in blog, true)
    assert.strictEqual('_id' in blog, false)
})

test('tests if blog is posted', async ()=>{
    let result = await api.get('/api/blogs')
    let lengthBefore = result.body.length
    let blog = {
      title: "This is a test for api",
      author: "String",
      url: "String",
      likes: "5467"
    };
    await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
    result = await api.get('/api/blogs')
    assert.strictEqual(result.body.length === lengthBefore + 1, true)

})

test('new blog content in database', async ()=>{
    const result = await api.get('/api/blogs')
    content = result.body.map(blog=> blog.title)
    assert.strictEqual(content.includes("This is a test for api"), true);
})

test('if likes property missing, like is set to 0', async ()=>{
    const blog = {
      title: "This is a test for 0 likes api",
      author: "String",
      url: "String"
    };
    const result = await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
    assert.strictEqual(result.body.likes, 0)
})

test('posts test user and deletes test user to test delete', async ()=>{
    let blog = {
      title: "This is a test for delete api",
      author: "String",
      url: "String",
      likes: "5467"
    };
    const posted = await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
    console.log(posted.body.id)
    await api.delete(`/api/blogs/${posted.body.id}`).expect(200)
    const results = await api.get('/api/blogs')
    const content = results.body.map(result => result.title)
    assert.strictEqual(content.includes("This is a test for delete api"), false);
})

test('updates existing blog likes', async ()=>{
    const newLikes = Math.floor(Math.random() * 999);
    const beforeUpdate = await api.get('/api/blogs')
    const likesBefore = beforeUpdate.body[0].likes
    assert.strictEqual(likesBefore === newLikes, false);
    const id = beforeUpdate.body[0].id
    await api
      .put(`/api/blogs/${id}`)
      .send({ likes: newLikes })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const afterUpdate = await api.get('/api/blogs')
    assert.strictEqual(afterUpdate.body[0].likes, newLikes);
})

after(async ()=>{
    console.log('closing monogodb connection...');
    await mongoose.connection.close();
    console.log("Mongoose connection closed");
})