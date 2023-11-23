const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@clustercourse.e4oqzxo.mongodb.net/phonebookApp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3) {
    Person.find({})
    .then((result) => {
      result.forEach((person) => {
        console.log(person);
      });
      mongoose.connection.close();
    })
    .catch((error) => {
      console.log('error', error);
      mongoose.connection.close();
    });
} else if (process.argv.length!==5) {
    console.log("When trying to add a person, the arguments should be name followed by the number. Both are mandatory")
    process.exit(1)
} else {
    const name = process.argv[3]
    const number = process.argv[4]

    const newPerson = new Person({
        name: name,
        number: number
    })
    newPerson.save().then(result => {
        console.log("Person saved!")
        mongoose.connection.close()
    })
}
