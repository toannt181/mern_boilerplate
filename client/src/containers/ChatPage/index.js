import React, { useCallback, useEffect, useState, memo, useMemo, useRef } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import { actions as appActions } from 'slices/appSlice'
import { actions as userActions, selectors as userSelectors } from 'slices/userSlice'
import ChannelContainer from './containers/ChannelContainer'
import RoomContainer from './containers/RoomContainer'
import { ChatWrapper } from './styles'
import * as UserAPI from '../../api/UserAPI'
import { requestNotifyPermission } from '../../utils/notification'
import RoomHeading from './components/RoomHeading'
import ChatInput from './components/ChatInput'
import { STATUS, MESSAGE_TYPE } from 'configs/constants'
import InviteMemberModal from './components/InviteMemberModal'


function ChatPage(props) {
  const {
    user,
    dispatchFetchChannel,
    currentChannelId,
    dispatchAddMessage,
    history,
    dispatchSetNotificationPermision,
    dispatchSendMessage,
    currentChannel,
    dispatchDeleteChannel,
    dispatchInviteMember,
    dispatchUpdateSingleChannel,
    dispatchRequestJoinRoom,
    channels,
    members,
  } = props

  const [content, setContent] = useState('')
  const [isShowInviteMemberModal, toggleInviteMemberModal] = useState(false)
  const joinedChannel = useRef([])

  useEffect(() => {
    dispatchFetchChannel()
    requestNotifyPermission()
      .then((result) => {
        dispatchSetNotificationPermision(result)
      })

    const unsubscribe = UserAPI.subscribeMessageChannel(({ message, channelId }) => {
      if (message.userId === user._id && message.type === MESSAGE_TYPE.TEXT) return
      if (currentChannelId === channelId) {
        dispatchAddMessage(message)
      } else {
        // dispatchUpdateSingleChannel({
        //   channelId,
        //   numberNotReadMessage: '+1',
        // })
      }
      new Notification(`${message.user.name}: ${message.content}`)
    })

    return unsubscribe
  }, [currentChannelId, user])

  useEffect(() => {
    const channelListId = []
    channels.forEach(item => {
      if (!joinedChannel.current[item._id]) {
        channelListId.push(item._id)
        joinedChannel.current[item._id] = true
      }
    })
    if (channelListId.length) {
      dispatchRequestJoinRoom({ channelListId })
    }
  }, [channels])

  const onDeleteChannel = useCallback(() => {
    dispatchDeleteChannel(currentChannelId)
    history.push('/channels')
  }, [currentChannelId])

  const onChange = (value) => {
    setContent(value)
  }

  const onSendMessage = useCallback(() => {
    dispatchSendMessage({ channelId: currentChannelId, content, user })
    setContent('')
  }, [currentChannelId, user, content])

  const isInvitedRoom = useMemo(() => {
    if (!currentChannel) return false
    return currentChannel.status === STATUS.PENDING
  }, [currentChannel])

  const onClickToggleInviteMemberModal = () => {
    toggleInviteMemberModal(state => !state)
  }

  const onInviteMember = (email) => {
    dispatchInviteMember({ email, channelId: currentChannelId })
    onClickToggleInviteMemberModal()
  }

  return (
    <ChatWrapper>
      <ChannelContainer />
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
          />}
        />
        {!isInvitedRoom && currentChannelId && (
          <ChatInput
            onEnter={onSendMessage}
            content={content}
            onChange={onChange}
          />
        )}
      </div>
      {isShowInviteMemberModal && (
        <InviteMemberModal
          members={members}
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
    members: state.user.members,
    currentChannel: userSelectors.getUserChannel(state),
  }),
  {
    dispatchSetNotificationPermision: appActions.dispatchSetNotificationPermision,
    dispatchFetchChannel: userActions.dispatchFetchChannel,
    dispatchAddMessage: userActions.dispatchAddMessage,
    dispatchRequestLeaveRoom: userActions.dispatchRequestLeaveRoom,
    dispatchSendMessage: userActions.dispatchSendMessage,
    dispatchDeleteChannel: userActions.dispatchDeleteChannel,
    dispatchInviteMember: userActions.dispatchInviteMember,
    dispatchRequestJoinRoom: userActions.dispatchRequestJoinRoom,
    dispatchUpdateSingleChannel: userActions.dispatchUpdateSingleChannel,
  }
)(ChatPage)))
