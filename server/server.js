const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const socket = require('./socket');
require('dotenv').config()

//constant
const MONGODB_URI = process.env.MONGODB_URL

// routes 
const authRoutes = require('./routes/authRoutes')
const conversationRouter = require('./routes/conversationRoute');
const usersRouter = require('./routes/usersRouter');

// utils
const app = express();
const isAuth = require('./utils/isAuth');

app.use(express.json())
app.use(cors())

// isAuth
app.use('/auth', authRoutes)
app.use('/conversation', isAuth, conversationRouter)
app.use('/users', isAuth, usersRouter)

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) console.log(err)
    const server = app.listen(4000, () => console.log('http://locahost:4000'))
    socket.init(server)
})


