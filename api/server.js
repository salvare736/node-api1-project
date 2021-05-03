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

server.post('/api/users', (req, res) => {
    User.insert(req.body)
        .then(newUser => {
            if (!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: 'Please provide name and bio for the user'
                })
            } else {
                // console.log(newUser)
                res.json(newUser)
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'There was an error while saving the user to the database',
                message: err.message,
                stack: err.stack
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
