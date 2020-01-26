import React from 'react'
import { ChannelContainerWrapper } from './styles'
import UserStatus from './UserStatus'
import ChannelList from './ChannelList'

const ChannelContainer = (props) => {
  const {
    user,
    onClickLogout,
    channels,
    onAddChannel,
    onClickChannel,
    currentChannel,
  } = props

  return (
    <ChannelContainerWrapper>
      <UserStatus user={user} onClickLogout={onClickLogout} />
      <ChannelList
        channels={channels}
        onAddChannel={onAddChannel}
        onClickChannel={onClickChannel}
        currentChannel={currentChannel}
      />
    </ChannelContainerWrapper>
  )
}

export default ChannelContainer
