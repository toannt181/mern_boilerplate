import React from 'react'
import { ChannelContainerWrapper } from './styles'
import UserStatus from './UserStatus'
import ChannelList from './ChannelList'

const ChannelContainer = ({ user, onClickLogout }) => (
  <ChannelContainerWrapper>
    <UserStatus user={user} onClickLogout={onClickLogout} />
    <ChannelList />
  </ChannelContainerWrapper>
)

export default ChannelContainer
