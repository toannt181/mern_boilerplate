import React, { useState, useEffect, useRef, memo, useCallback } from 'react'
import { connect } from 'react-redux'
import { actions as userActions } from 'slices/userSlice'
import {
  MessageList,
  RoomContainerWrapper,
} from './styles'

import MessageItem from './MessageItem'

let prevMessageLength

const RoomContainer = (props) => {
  const {
    messages = [],
    user = {},
    currentChannel,
    dispatchFetchMessage,
    dispatchRequestJoinRoom,
    dispatchSelectChannel,
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
    if (channelId && currentChannel !== channelId) {
      onFetchMessageChannel(params.id)
      dispatchSelectChannel(channelId)
    }
  }, [onFetchMessageChannel, dispatchSelectChannel, currentChannel, params])


  useEffect(() => {
    const ref = wrapperRef.current

    if (!prevMessageLength || messages.length > prevMessageLength) {
      ref.scrollTop = ref.scrollHeight - ref.clientHeight
    }

    return () => { prevMessageLength = 0 }
  }, [messages])

  return (
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
    currentChannel: state.user.currentChannel,
  }),
  {
    dispatchFetchMessage: userActions.dispatchFetchMessage,
    dispatchRequestJoinRoom: userActions.dispatchRequestJoinRoom,
    dispatchSelectChannel: userActions.dispatchSelectChannel,
  }
)(RoomContainer))
