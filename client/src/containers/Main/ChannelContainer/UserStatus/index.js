import React from 'react'
import { UserStatusWrapper } from './styles'

const UserStatus = ({ user }) => (
  <UserStatusWrapper>{console.log(user)}
    {user ? user.name : 'Anonymous'}
  </UserStatusWrapper>
)

export default UserStatus
