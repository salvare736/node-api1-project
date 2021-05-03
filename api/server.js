// BUILD YOUR SERVER HERE

const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            // throw new Error('BIG BAD ERROR - BE AFRAID')
            console.log(users)
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                error: 'The users information could not be retrieved',
                message: err.message,
                stack: err.stack
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
