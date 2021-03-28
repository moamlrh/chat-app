import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:4000')

export default socket