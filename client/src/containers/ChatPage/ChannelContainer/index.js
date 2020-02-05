import React from 'react'
import { ChannelContainerWrapper } from './styles'
import ChannelList from './ChannelList'

const ChannelContainer = (props) => {
  const {
    channels,
    onAddChannel,
    onClickChannel,
    currentChannel,
  } = props

  return (
    <ChannelContainerWrapper>
      <h2 className="title is-2">Chat</h2>
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
