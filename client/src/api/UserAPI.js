import Request from './request'

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

export function fetchMessage(channelId) {
  return Request.get({ url: `channels/${channelId}/messages` })
}

export function sendMessage({ channelId, content }) {
  return Request.post({ url: `channels/${channelId}/messages`, data: { channelId, content } })
}
