import axios from "axios"
const baseUrl = '/api/users'

let token = null
let config = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  config = { headers: { Authorization: token } }
}

const getAll = async () => {
    const response = await axios.get(baseUrl, config)
    return response.data
}

export default { getAll }