import socketio from 'socket.io-client'

const socket = socketio('http://localhost:4000')

export default socket