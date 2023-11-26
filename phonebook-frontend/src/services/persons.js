import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return (
      request.then(response => response.data)
    )
  }

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return (
    request.then(response => {
      console.log("Logging the response", response)
      return response.data
    })
  )
}

const delete_entry = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log(request.data)
    return request.then(response => getAll())
}

export default { getAll, create, update, delete_entry }