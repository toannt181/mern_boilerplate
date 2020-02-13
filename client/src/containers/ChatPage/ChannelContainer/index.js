import React from 'react'
import { ChannelContainerWrapper } from './styles'
import ChannelList from './ChannelList'
import FriendList from './FriendList'

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
        title="Favorites"
        channels={favoriteChannels}
        onClickChannel={onClickChannel}
        currentChannelId={currentChannelId}
      />
      <ChannelList
        title="Channels"
        channels={channels}
        onAddChannel={onAddChannel}
        onClickChannel={onClickChannel}
        currentChannelId={currentChannelId}
      />
      <FriendList
        title="Members"
      />
    </ChannelContainerWrapper>
  )
}

export default ChannelContainer
