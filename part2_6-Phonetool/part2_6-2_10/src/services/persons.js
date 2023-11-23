import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  console.log(baseUrl)
  const request = axios.get(baseUrl)
  console.log(request)
  return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const delete_entry = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log(request.data)
    return request.then(response => getAll())
}

export default { getAll, create, update, delete_entry }