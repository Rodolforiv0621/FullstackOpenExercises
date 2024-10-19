import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

const setToken = newToken =>{
  token = `Bearer ${newToken}`
  config = {headers: {Authorization: token}}
}

const getAll = () => {
  try{
    const response = axios.get(baseUrl, config)
    return response.then(response => response.data)
  }catch(e){
    
  }
  
}

const create = async (title, author, url) =>{
  let blog = {
    title: title,
    author: author,
    url: url,
  }
  const response = axios.post(baseUrl, blog, config)
  return response.data
}

export default { getAll, setToken, create }