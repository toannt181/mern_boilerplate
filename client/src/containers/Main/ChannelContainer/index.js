import React from 'react'
import { ChannelContainerWrapper } from './styles'
import UserStatus from './UserStatus'
import ChannelList from './ChannelList'

const ChannelContainer = ({ user, onClickLogout, channels, onAddChannel }) => (
  <ChannelContainerWrapper>
    <UserStatus user={user} onClickLogout={onClickLogout} />
    <ChannelList channels={channels} onAddChannel={onAddChannel} />
  </ChannelContainerWrapper>
)

export default ChannelContainer
