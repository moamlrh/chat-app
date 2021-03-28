const usersRouter = require('express').Router()
const usersController = require('../controllers//usersController')


usersRouter.get('/get-all-users', usersController.getAllUsers)

usersRouter.get('/get-user-by-id', usersController.getUserById)

usersRouter.put('/block-user', usersController.blockUser)

usersRouter.get('/get-my-info', usersController.getUserInfo)


module.exports = usersRouter