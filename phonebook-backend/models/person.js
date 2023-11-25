if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const url = process.env.DB_URL;
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
console.log("Connectiong to ", url)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)