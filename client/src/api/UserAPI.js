import Request from './request'
import socket from '../configs/socket'

export function createUser(data) {
  return Request.post({ url: 'users', data })
}

export function fetchUser() {
  return Request.get({ url: 'users' })
}

export function fetchChannel() {
  return Request.get({ url: 'channels' })
}

export function createChannel(data) {
  return Request.post({ url: 'channels', data })
}

export function deleteChannel(channelId) {
  return Request.delete({ url: `channels/${channelId}` })
}

export function fetchMessage(channelId) {
  return Request.get({ url: `channels/${channelId}/messages` })
}

export function sendMessage({ channelId, content }) {
  return Request.post({ url: `channels/${channelId}/messages`, data: { channelId, content } })
}

export function requestJoinRoom({ channelId }) {
  socket.emit('join', { channelId })
}

export function emitNewMessage({ channelId, message }) {
  socket.emit('send-new-message', { channelId, message })
}

export function subscribeMessageChannel(callback) {
  socket.on('receive-new-message', (data) => {
    callback(data)
  })
}
