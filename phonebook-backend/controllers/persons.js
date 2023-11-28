const personsRouter = require('express').Router()
const Person = require('../models/person')
const common = require('../utils/common')

personsRouter.get('', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person).end()
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(person => {
    if (person) {
      response.status(203).end()
    } else {
      response.status(204).end()
    }
  }).catch(error => next(error))
})

personsRouter.post('', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const update = { name: body.name, number: body.number }

  Person.findByIdAndUpdate(
    request.params.id,
    update,
    { new: true, runValidators: true,  context: 'query' }
  ).then(person => {
    if (person) {
      return response.json(person).end()
    } else {
      return response.status(204).end()
    }
  }).catch(error => next(error))
})

personsRouter.get('/info', () => {
  const now = common.getCurrentDateTime()
  Person.find({}).then(persons => {`<div>Phonebook has info for ${persons.length} people</dvi><br/>
    ${now}`
  })
})

module.exports = personsRouter