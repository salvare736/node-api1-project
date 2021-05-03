// BUILD YOUR SERVER HERE

const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            // throw new Error('BIG BAD ERROR - BE AFRAID')
            // console.log(users)
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

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: `The user with the specified ID, ${req.params.id}, does not exist`
                })
            } else {
                // console.log(user)
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'The user information could not be retrieved',
                message: err.message,
                stack: err.stack
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
