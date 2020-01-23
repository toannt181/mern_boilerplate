import Request from './request'

export function createUser(data) {
  return Request.post({ url: 'users', data })
}

export function fetchUser() {
  return Request.get({ url: 'users' })
}

export function fetchChannel() {
  return Request.post({ url: 'channels' })
}
