import axios from 'axios'
const baseUrl = '/api/blogs'
import Message from '../components/DisplayMessage'

let token = null
let config = null

const setToken = newToken =>{
  token = `Bearer ${newToken}`
  config = {headers: {Authorization: token}}
}

const getAll = async () => {
  try{
    const response = await axios.get(baseUrl, config)
    return response.data
  }catch(error){
    
    console.log(error.message)
    return "error"
  }
  
}

const create = async (title, author, url) =>{
  // Could pass in object already structered instead of creating object here
  let blog = {
    title: title,
    author: author,
    url: url,
  }
  const response = axios.post(baseUrl, blog, config)
  return response.data
}

export default { getAll, setToken, create }