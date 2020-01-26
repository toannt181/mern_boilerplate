import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { actions as appActions } from '../App/slice'
import { actions } from './slice'
import SideMenu from '../../components/SideMenu'
import ChannelContainer from './ChannelContainer'
import RoomContainer from './RoomContainer'
import ChannelModal from './ChannelModal'
import { MainWrapper } from './styles'

function Main(props) {
  const {
    user,
    dispatchSetUser,
    channels,
    dispatchCreateChannel,
    dispatchFetchChannel,
    dispatchSelectChannel,
    currentChannel,
    messages,
    dispatchFetchMessage,
    dispatchSendMessage,
  } = props

  const [isShowChannelModal, toggleChannelModal] = useState(false)

  useEffect(() => {
    dispatchFetchChannel()
  }, [])

  const onClickLogout = useCallback(() => {
    localStorage.clear()
    dispatchSetUser(null)
  }, [dispatchSetUser])

  const onAddChannel = useCallback(() => {
    toggleChannelModal(state => !state)
  }, [toggleChannelModal])

  const onCreateChannel = useCallback((name) => {
    dispatchCreateChannel({ name })
    toggleChannelModal(false)
  }, [dispatchCreateChannel])

  const onClickChannel = useCallback((channelId) => {
    dispatchSelectChannel(channelId)
    dispatchFetchMessage({ channelId })
  }, [dispatchSelectChannel, dispatchFetchMessage])

  const onSendMessage = useCallback((content) => {
    dispatchSendMessage({ channelId: currentChannel, content })
  }, [dispatchSendMessage, currentChannel])

  return (
    <MainWrapper>
      <SideMenu />
      <ChannelContainer
        user={user}
        onClickLogout={onClickLogout}
        channels={channels}
        onAddChannel={onAddChannel}
        onClickChannel={onClickChannel}
        currentChannel={currentChannel}
      />
      <RoomContainer 
        currentChannel={currentChannel}
        messages={messages}
        onSendMessage={onSendMessage}
      />
      {isShowChannelModal && (
        <ChannelModal
          onCloseModal={onAddChannel}
          onCreateChannel={onCreateChannel}
        />
      )}
    </MainWrapper>
  )
}

export default connect(
  state => ({
    user: state.app.user,
    channels: state.main.channels,
    currentChannel: state.main.currentChannel,
    messages: state.main.messages,
  }),
  {
    dispatchSetUser: appActions.dispatchSetUser,
    dispatchCreateChannel: actions.dispatchCreateChannel,
    dispatchFetchChannel: actions.dispatchFetchChannel,
    dispatchSelectChannel: actions.dispatchSelectChannel,
    dispatchFetchMessage: actions.dispatchFetchMessage,
    dispatchSendMessage: actions.dispatchSendMessage,
  }
)(Main)
