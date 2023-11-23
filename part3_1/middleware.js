const morgan = require('morgan')

const logMiddleware = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
}

morgan.token('person', function (req, res) { return JSON.stringify(req.body) })

const logPost = morgan(':method :url :status :res[content-length] - :response-time ms :person', {
    'skip': (req, res) => {
        return req.method !== 'POST'
    }
})

module.exports = {
    logMiddleware, logPost
};


