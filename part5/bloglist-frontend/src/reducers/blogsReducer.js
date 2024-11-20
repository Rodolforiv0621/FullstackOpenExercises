import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import { setUser } from "./userReducer"

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action){
            return action.payload
        },
        createBlog(state, action){
            state.push(action.payload)
        }
    }
})

export const { setBlogs, createBlog } = blogsSlice.actions

export const initializeBlogs = () => {
    return async (dispatch, getState) => {
        try{

            let blogs = await blogService.getAll()

            if(blogs === 'error'){
                window.localStorage.removeItem('loggedBlogappUser')
                dispatch(setUser(null))
                return
            }

            const user = getState().user

            blogs = blogs.sort((a, b) => b.likes - a.likes)

            blogs = blogs.map((blog) => {
                return ({
                ...blog,
                currentUser: user && blog.user? user.username === blog.user.username : false
                })
            })

            dispatch(setBlogs(blogs))
        }catch(e){
            console.error('failed to initialize blogs: ', e)
        }
    }

}

export default blogsSlice.reducer