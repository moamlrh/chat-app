let io, socket;
const User = require('./models/userModel')

module.exports = {
    init: (server) => {
        io = require('socket.io')(server)
        io.on('connection', (s) => {
            socket = s

            socket.on('on-user-disconnect', (userId) => {
                User.findByIdAndUpdate(userId, {
                    offline: true
                }).then((user) => {
                    io.emit('on-user-disconnect', userId)
                    console.log('offline : true')
                })
            })
            socket.on('on-user-connect', (userId) => {
                User.findByIdAndUpdate(userId, {
                    offline: false
                }).then((user) => {

                    io.emit('on-user-connect', user)
                    console.log('offline : false')
                })
            })

        })
    },
    io: () => io,
    socket: () => socket,

}