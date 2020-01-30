import socketio from 'socket.io-client'

const socket = socketio(process.env.REACT_APP_API_URL)

export default socket