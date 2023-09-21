const mongoose = require('mongoose')
require('dotenv').config()


const URL = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

mongoose.connect(URL)
    .then(result => {
        console.log('Connected to MongoDB')
    }).catch(error => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        require: true
    },
    number: {
        type: String,
        minLength: 3,
        require: true
    }
})


phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})


module.exports = mongoose.model('Phonebook', phonebookSchema)