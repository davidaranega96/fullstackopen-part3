if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const validator = require('./validators.js')
const url = process.env.DB_URL;
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
console.log("Connectiong to ", url)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    number: {
      type: String,
      required: true,
      validate: {validator: validator.validatePhoneNUmber}
    }
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