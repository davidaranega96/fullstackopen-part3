const middleware = require('./middleware');
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())
app.use(middleware.logPost)

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxNumber = 10**8
    return (
        Math.floor(Math.random() * maxNumber)
    )
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const idToDelete = Number(request.params.id)
    persons = persons.filter(person => person.id !== idToDelete)
    

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "missing name or number"
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: "person already in the phonebook"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
    
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
    const PhonebookLength = persons.length
    response.send(
        `<div>Phonebook has info for ${PhonebookLength} people</dvi>
        <br/>
        ${now}`
    )
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
