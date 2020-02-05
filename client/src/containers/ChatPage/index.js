import React, { useCallback, useEffect, useState, memo } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import { actions as appActions } from 'slices/appSlice'
import { actions as userActions } from 'slices/userSlice'
import Navbar from '../../components/Navbar'
import ChannelContainer from './ChannelContainer'
import RoomContainer from './RoomContainer'
import ChannelModal from './ChannelModal'
import { ChatWrapper } from './styles'
import * as UserAPI from '../../api/UserAPI'
import { requestNotifyPermission } from '../../utils/notification'
import RoomHeading from './RoomHeading'
import ChatInput from './ChatInput'

function ChatPage(props) {
  const {
    user,
    channels,
    dispatchCreateChannel,
    dispatchFetchChannel,
    currentChannel,
    dispatchAddMessage,
    dispatchRequestLeaveRoom,
    history,
    dispatchSetNotificationPermision,
    dispatchSendMessage,
  } = props

  const [isShowChannelModal, toggleChannelModal] = useState(false)
  const [content, setContent] = useState('')

  useEffect(() => {
    dispatchFetchChannel()
    requestNotifyPermission()
      .then((result) => {
        dispatchSetNotificationPermision(result)
      })

    UserAPI.subscribeMessageChannel(function ({ message }) {
      dispatchAddMessage(message)
      new Notification(`${message.user.name}: ${message.content}`)
    })
  }, [dispatchFetchChannel, dispatchAddMessage, dispatchSetNotificationPermision])


  const onAddChannel = useCallback(() => {
    toggleChannelModal(state => !state)
  }, [toggleChannelModal])

  const onCreateChannel = useCallback((name) => {
    dispatchCreateChannel({ name })
    toggleChannelModal(false)
  }, [dispatchCreateChannel])

  const onClickChannel = useCallback((channelId) => {
    if (currentChannel !== channelId) {
      if (currentChannel) {
        dispatchRequestLeaveRoom({ channelId: currentChannel })
      }
      history.push(`/channels/${channelId}`)
    }
  },
    [
      currentChannel,
      dispatchRequestLeaveRoom,
      history,
    ]
  )

  const onChange = (e) => {
    setContent(e.target.value)
  }

  const onSendMessage = useCallback(() => {
    dispatchSendMessage({ channelId: currentChannel, content, user })
    setContent('')
  }, [dispatchSendMessage, currentChannel, user, content])

  return (
    <ChatWrapper>
      <ChannelContainer
        channels={channels}
        onAddChannel={onAddChannel}
        onClickChannel={onClickChannel}
        currentChannel={currentChannel}
      />
      <div className="room">
        <Navbar />
        <RoomHeading />
        <Route
          path="/channels/:id"
          component={RoomContainer}
        />
        <ChatInput
          onEnter={onSendMessage}
          content={content}
          onChange={onChange}
        />
      </div>
      {isShowChannelModal && (
        <ChannelModal
          onCloseModal={onAddChannel}
          onCreateChannel={onCreateChannel}
        />
      )}
    </ChatWrapper>
  )
}

export default memo(withRouter(connect(
  state => ({
    user: state.app.user,
    channels: state.user.channels,
    currentChannel: state.user.currentChannel,
    messages: state.user.messages,
  }),
  {
    dispatchSetNotificationPermision: appActions.dispatchSetNotificationPermision,
    dispatchCreateChannel: userActions.dispatchCreateChannel,
    dispatchFetchChannel: userActions.dispatchFetchChannel,
    dispatchAddMessage: userActions.dispatchAddMessage,
    dispatchRequestLeaveRoom: userActions.dispatchRequestLeaveRoom,
    dispatchSendMessage: userActions.dispatchSendMessage,
  }
)(ChatPage)))
