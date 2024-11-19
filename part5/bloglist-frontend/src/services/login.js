import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {

  let response = await axios.post(baseUrl, { username, password })
  return response.data


}

export default { login }