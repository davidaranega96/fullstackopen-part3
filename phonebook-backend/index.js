if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const Person = require('./models/person');
const middleware = require('./middleware');
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.logPost)
app.use(middleware.baseLog)

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
      });
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person).end();
        } else {
            response.status(404).end();
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(person => {
        if (person) {
            response.status(203).end()
        } else {
            response.status(204).end()
        }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    update = { name: body.name, number: body.number }

    Person.findByIdAndUpdate(
        request.params.id,
        update,
        { new: true, runValidators: true,  context: 'query'}
    )
    .then(person => {
        if (person) {
            return response.json(person).end();
        } else {
            return response.status(204).end();
        }
    })
    .catch(error => next(error))
})

const getCurrentDateTime = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
 
    console.log(dateTime)

    return dateTime
}

app.get('/info', (request, response) => {
    const now = getCurrentDateTime()
    Person.find({}).then(persons => {
        `<div>Phonebook has info for ${persons.length} people</dvi>
        <br/>
        ${now}`
    })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandling)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
