import React, { useEffect, useRef, memo, useCallback } from 'react'
import { connect } from 'react-redux'
import { actions as userActions } from 'slices/userSlice'
import {
  MessageList,
  RoomContainerWrapper,
} from './styles'

import MessageItem from './MessageItem'
import InviteMessage from '../InviteMessage'

let prevMessageLength

const RoomContainer = (props) => {
  const {
    messages = [],
    user = {},
    currentChannelId,
    dispatchFetchMessage,
    dispatchRequestJoinRoom,
    dispatchSelectChannel,
    isInvitedRoom = false,
    acceptInvitation = (() => { }),
    match: { params } = {},
  } = props

  const wrapperRef = useRef()

  const onFetchMessageChannel = useCallback((channelId) => {
    dispatchFetchMessage({ channelId })
    dispatchRequestJoinRoom({ channelId })
  },
    [
      dispatchFetchMessage,
      dispatchRequestJoinRoom,
    ]
  )

  useEffect(() => {
    const channelId = params.id
    if (channelId && currentChannelId !== channelId) {
      onFetchMessageChannel(params.id)
      dispatchSelectChannel(channelId)
    }
  }, [onFetchMessageChannel, dispatchSelectChannel, currentChannelId, params])

  useEffect(() => {
    const ref = wrapperRef.current

    if (ref && (!prevMessageLength || messages.length > prevMessageLength)) {
      ref.scrollTop = ref.scrollHeight - ref.clientHeight
    }

    return () => { prevMessageLength = 0 }
  }, [messages])

  return isInvitedRoom
    ? <InviteMessage acceptInvitation={acceptInvitation} />
    : (
      <RoomContainerWrapper ref={wrapperRef}>
        <MessageList>
          {messages.map((message, i) => <MessageItem key={i} message={message} position={message.createdBy === user._id ? 'right' : 'left'} />)}
        </MessageList>
      </RoomContainerWrapper>
    )
}

export default memo(connect(
  state => ({
    user: state.app.user,
    messages: state.user.messages,
    currentChannelId: state.user.currentChannelId,
  }),
  {
    dispatchFetchMessage: userActions.dispatchFetchMessage,
    dispatchRequestJoinRoom: userActions.dispatchRequestJoinRoom,
    dispatchSelectChannel: userActions.dispatchSelectChannel,
  }
)(RoomContainer))
