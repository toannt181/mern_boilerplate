import React from 'react'
import { ChannelContainerWrapper } from './styles'
import UserStatus from './UserStatus'
import ChannelList from './ChannelList'

const ChannelContainer = ({ user }) => (
  <ChannelContainerWrapper>
    <UserStatus user={user} />
    <ChannelList />
  </ChannelContainerWrapper>
)

export default ChannelContainer
