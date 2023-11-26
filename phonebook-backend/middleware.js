const morgan = require('morgan')

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

morgan.token('person', function (req, res) { return JSON.stringify(req.body) })

const logPost = morgan(':method :url :status :res[content-length] - :response-time ms :person', {
    'skip': (req, res) => {
        return req.method !== 'POST'
    }
})

const baseLog = morgan(':method :url :status :res[content-length] - :response-time ms', {
    'skip': (req, res) => {
        return req.method === 'POST'
    }
})

const errorHandling = (error, request, response, next) => {
    console.error("Error handling the data ", error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted data' })
      } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
    next(error)
}

module.exports = {
    logPost, baseLog, errorHandling, unknownEndpoint
};


