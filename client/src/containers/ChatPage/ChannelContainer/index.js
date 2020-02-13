import React from 'react'
import { ChannelContainerWrapper } from './styles'
import ChannelList from './ChannelList'

const ChannelContainer = (props) => {
  const {
    channels = [],
    favoriteChannels = [],
    onAddChannel,
    onClickChannel,
    currentChannelId,
  } = props

  return (
    <ChannelContainerWrapper>
      <ChannelList
        title="Favorite"
        channels={favoriteChannels}
        onClickChannel={onClickChannel}
        currentChannelId={currentChannelId}
      />
      <ChannelList
        title="Channel"
        channels={channels}
        onAddChannel={onAddChannel}
        onClickChannel={onClickChannel}
        currentChannelId={currentChannelId}
      />
    </ChannelContainerWrapper>
  )
}

export default ChannelContainer
