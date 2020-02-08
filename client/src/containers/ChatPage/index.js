import React, { useCallback, useEffect, useState, memo } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import { actions as appActions } from 'slices/appSlice'
import { actions as userActions, selectors as userSelectors } from 'slices/userSlice'
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
    currentChannelId,
    dispatchAddMessage,
    dispatchRequestLeaveRoom,
    history,
    dispatchSetNotificationPermision,
    dispatchSendMessage,
    currentChannel,
    dispatchDeleteChannel,
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

  const onDeleteChannel = useCallback(() => {
    dispatchDeleteChannel(currentChannelId)
    history.push('/channels')
  }, [dispatchDeleteChannel, currentChannelId, history])

  const onClickChannel = useCallback((channelId) => {
    if (currentChannelId !== channelId) {
      if (currentChannelId) {
        dispatchRequestLeaveRoom({ channelId: currentChannelId })
      }
      history.push(`/channels/${channelId}`)
    }
  },
    [
      currentChannelId,
      dispatchRequestLeaveRoom,
      history,
    ]
  )

  const onChange = (value) => {
    setContent(value)
  }

  const onSendMessage = useCallback(() => {
    dispatchSendMessage({ channelId: currentChannelId, content, user })
    setContent('')
  }, [dispatchSendMessage, currentChannelId, user, content])

  return (
    <ChatWrapper>
      <ChannelContainer
        channels={channels}
        onAddChannel={onAddChannel}
        onClickChannel={onClickChannel}
        currentChannelId={currentChannelId}
      />
      <div className="room">
        <RoomHeading
          currentChannel={currentChannel}
          deleteChannel={onDeleteChannel}
        />
        <Route
          path="/channels/:id"
          component={RoomContainer}
        />
        {currentChannelId && (
          <ChatInput
            onEnter={onSendMessage}
            content={content}
            onChange={onChange}
          />
        )}
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
    currentChannelId: state.user.currentChannelId,
    messages: state.user.messages,
    currentChannel: userSelectors.getUserChannel(state),
  }),
  {
    dispatchSetNotificationPermision: appActions.dispatchSetNotificationPermision,
    dispatchCreateChannel: userActions.dispatchCreateChannel,
    dispatchFetchChannel: userActions.dispatchFetchChannel,
    dispatchAddMessage: userActions.dispatchAddMessage,
    dispatchRequestLeaveRoom: userActions.dispatchRequestLeaveRoom,
    dispatchSendMessage: userActions.dispatchSendMessage,
    dispatchDeleteChannel: userActions.dispatchDeleteChannel,
  }
)(ChatPage)))
