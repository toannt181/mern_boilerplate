module.exports = {
  paginate: {
    limit: 15,
  },
  room: {
    role: {
      MANAGEMENT: 1,
      MEMBER: 2,
      VIEWER: 3,
    },
    status: {
      JOINED: 1,
      PENDING: 2,
      BLOCKED: 3,
    },
  },
  message: {
    type: {
      TEXT: 1,
      NOTIFICATION: 2,
      JOIN_MESSAGE: 3,
    },
  },
  user: {
    status: {
      ONLINE: 1,
      OFFLINE: 2,
      PENDING: 3,
    },
  },
}
