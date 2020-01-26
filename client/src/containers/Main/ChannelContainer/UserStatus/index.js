import React from 'react'
import { UserStatusWrapper } from './styles'

const UserStatus = ({ user, onClickLogout }) => (
  <UserStatusWrapper className="d-center">
    <div>{user ? user.name : 'Anonymous'}</div>
    <button className="ml-auto button is-primary is-small" onClick={onClickLogout}>Logout</button>
  </UserStatusWrapper>
)

export default UserStatus
