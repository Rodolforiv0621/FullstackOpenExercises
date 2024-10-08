import axios from "axios";
const basUrl = "/api/persons";

const getAll = () => {
    const request = axios.get(basUrl)
    return request.then(response => response.data)
}

const create = (person) =>{
    const request = axios.post(basUrl, person)
    return request.then(response => response.data)
}

const deletePerson = (id) =>{
    const request = axios.delete(`${basUrl}/${id}`)
    return request.then(response=>response.data)
}

const update = (id, person) =>{
    const request = axios.put(`${basUrl}/${id}`, person)
    return request.then(response=>response.data)
}

export default {getAll, create, deletePerson, update}