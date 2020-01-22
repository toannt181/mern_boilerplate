import React from 'react'
import { ChannelContainerWrapper } from './styles'
import UserStatus from './UserStatus'
import ChannelList from './ChannelList'

const ChannelContainer = () => (
  <ChannelContainerWrapper>
    <UserStatus />
    <ChannelList />
  </ChannelContainerWrapper>
)

export default ChannelContainer
