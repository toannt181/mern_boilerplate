import React from 'react'

const UserStatus = ({ user, onClickLogout }) => (
  <div className="d-center">
    <p className="subtitle mr-2">{user ? user.name : 'Anonymous'}</p>
    <button className="ml-auto btn-none is-primary" onClick={onClickLogout}>Logout</button>
  </div>
)

export default UserStatus
