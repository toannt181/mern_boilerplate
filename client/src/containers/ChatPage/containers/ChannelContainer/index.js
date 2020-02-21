import React, { useCallback, useEffect, useState, memo, useMemo } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { actions as userActions, selectors as userSelectors } from 'slices/userSlice'

import { ChannelContainerWrapper } from './styles'
import ChannelList from './ChannelList'
import FriendList from './FriendList'

const ChannelContainer = (props) => {
  const {
    channels = [],
    favoriteChannels = [],
    onAddChannel = (() => { }),
    currentChannelId,
    history,
  } = props


  const onClickChannel = useCallback((channelId) => {
    if (currentChannelId !== channelId) {
      history.push(`/channels/${channelId}`)
    }
  },
    [currentChannelId]
  )

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

export default memo(withRouter(connect(
  state => ({
    channels: state.user.channels,
    currentChannelId: state.user.currentChannelId,
    currentChannel: userSelectors.getUserChannel(state),
  }),
  {
    // dispatchUpdateSingleChannel: userActions.dispatchUpdateSingleChannel,
  }
)(ChannelContainer)))
