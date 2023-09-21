const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');
const Phonebook = require('./models/phonebook')
let list = require('./list.json');
const { unkownEnpoint } = require('./middlewares/unkwonEnpoint.js')

const PORT = process.env.PORT || 3001;
app.disable('x-powered-by');
app.use(cors())
app.use(express.json());

morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time ms - :body '))



app.get('/api/persons', (req, res) => {
    Phonebook.find({}).then(result => res.json(result))
});

app.get('/info', (req, res) => {
    const time = new Date()
    Phonebook.find({}).then(result => {
        res.json(`Entries: ${result.length} Time: ${time}`)
    })
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Phonebook.findById(id).then(item => {
        res.json(item)
    })
});

// const getRandomId = () => {
//     const maxId = list.length > 0
//         ? Math.max(...list.map(n => n.id))
//         : 0

//     return maxId + 1
// }

app.post('/api/persons', async (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(404).json({
            error: 'Name and number is missing'
        })
    }

    const select = list.some(item => item.name.toLowerCase() === body.name)
    if (select) {
        return res.json({
            error: 'name must be unique'
        })
    }

    const newPerson = new Phonebook({
        name: body.name,
        number: body.number
    })

    newPerson.save().then(response => {
        res.json(response)
    })

});

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const newPerson = {
        name: body.name,
        number: body.number
    }

    Phonebook.findByIdAndUpdate(id, newPerson, { new: true }).then(response => {
        res.json(response)
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Phonebook.findByIdAndDelete(id).then(response => {
        res.status(204).end()
    })
        .catch(error => next(error))
})

app.use(unkownEnpoint)
const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        res.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
});