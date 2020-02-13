import React, { useCallback, useEffect, useState, memo, useMemo } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import find from 'lodash/find'

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
import { STATUS, MESSAGE_TYPE } from 'configs/constants'
import InviteMemberModal from './InviteMemberModal'

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
    dispatchRequestAcceptInvitedChannel,
    dispatchInviteMember,
  } = props

  const [isShowChannelModal, toggleChannelModal] = useState(false)
  const [content, setContent] = useState('')
  const [isShowInviteMemberModal, toggleInviteMemberModal] = useState(false)

  useEffect(() => {
    dispatchFetchChannel()
    requestNotifyPermission()
      .then((result) => {
        dispatchSetNotificationPermision(result)
      })

    UserAPI.subscribeMessageChannel(function ({ message }) {
      if (message.createdBy === user._id && message.type === MESSAGE_TYPE.TEXT) return
      dispatchAddMessage(message)
      new Notification(`${message.user.name}: ${message.content}`)
    })
  }, [dispatchFetchChannel, user, dispatchAddMessage, dispatchSetNotificationPermision])


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

  const acceptInvitation = useCallback(() => {
    dispatchRequestAcceptInvitedChannel(currentChannelId)
  },
    [currentChannelId, dispatchRequestAcceptInvitedChannel]
  )

  const onChange = (value) => {
    setContent(value)
  }

  const onSendMessage = useCallback(() => {
    dispatchSendMessage({ channelId: currentChannelId, content, user })
    setContent('')
  }, [dispatchSendMessage, currentChannelId, user, content])

  const isInvitedRoom = useMemo(() => {
    if (!currentChannel) return false
    const member = find(currentChannel.members, { _id: user._id })
    if (!member) return false
    return member.status === STATUS.PENDING
  }, [currentChannel, user])


  const onClickToggleInviteMemberModal = () => {
    toggleInviteMemberModal(state => !state)
  }

  const onInviteMember = (email) => {
    dispatchInviteMember({ email, channelId: currentChannelId })
    onClickToggleInviteMemberModal()
  }

  return (
    <ChatWrapper>
      <ChannelContainer
        channels={channels}
        onAddChannel={onAddChannel}
        onClickChannel={onClickChannel}
        currentChannelId={currentChannelId}
      />
      <div className="room">
        {!isInvitedRoom && (
          <RoomHeading
            currentChannel={currentChannel}
            deleteChannel={onDeleteChannel}
            onInviteMember={onClickToggleInviteMemberModal}
          />
        )}
        <Route
          path="/channels/:id"
          render={(props) => <RoomContainer
            {...props}
            isInvitedRoom={isInvitedRoom}
            acceptInvitation={acceptInvitation}
          />}
        />
        {!isInvitedRoom && currentChannelId && (
          <ChatInput
            onEnter={onSendMessage}
            content={content}
            onChange={onChange}
          />
        )}
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
      {isShowInviteMemberModal && (
        <InviteMemberModal
          onCloseModal={onClickToggleInviteMemberModal}
          onInviteMember={onInviteMember}
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
    dispatchRequestAcceptInvitedChannel: userActions.dispatchRequestAcceptInvitedChannel,
    dispatchInviteMember: userActions.dispatchInviteMember,
  }
)(ChatPage)))
