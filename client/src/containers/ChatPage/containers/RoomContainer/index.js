import React, { useEffect, useRef, memo, useCallback } from 'react'
import { connect } from 'react-redux'
import last from 'lodash/last'
import throttle from 'lodash/throttle'
import { actions as userActions, selectors as userSelectors } from 'slices/userSlice'
import { actions as appActions } from 'slices/appSlice'
import {
  MessageList,
  RoomContainerWrapper,
} from './styles'

import MessageItem from './components/MessageItem'
import InviteMessage from './components/InviteMessage'

import { MINIMUN_DELAY } from 'configs/constants'

const MINIMUM_A_MESSAGE_HEIGHT = 40

let prevMessageLength

const RoomContainer = (props) => {
  const {
    messages = [],
    user = {},
    currentChannelId,
    currentChannel,
    dispatchFetchMessage,
    dispatchSelectChannel,
    isInvitedRoom = false,
    match: { params } = {},
    dispatchLastReadMessage,
    dispatchUpdateViewUserId,
    dispatchRequestAcceptInvitedChannel,
  } = props

  const wrapperRef = useRef()
  const isFirstScroll = useRef(false)

  const onFetchMessageChannel = useCallback((channelId) => {
    dispatchFetchMessage({ channelId })
  }, [])

  const onScrollAtBottom = useCallback(() => {
    const lastMessage = last(messages)

    if (!lastMessage || (currentChannel && currentChannel.lastReadMessageId === lastMessage._id)) return
    const payload = {
      channelId: currentChannel._id,
      lastReadMessageId: lastMessage._id,
    }
    dispatchLastReadMessage(payload)
  }, [messages, currentChannel])

  const onScroll = throttle(() => {
    const ref = wrapperRef.current
    if (!ref) return
    isFirstScroll.current = true
    const isScrollAtBottom = ref.scrollTop >= ref.scrollHeight - ref.clientHeight - MINIMUM_A_MESSAGE_HEIGHT
    if (isScrollAtBottom) {
      onScrollAtBottom()
    }
  }, MINIMUN_DELAY)

  useEffect(() => {
    if (isFirstScroll.current || !messages.length) return
    isFirstScroll.current = true
    onScrollAtBottom()
  }, [messages])

  useEffect(() => {
    const channelId = params.id
    if (channelId && currentChannelId !== channelId) {
      onFetchMessageChannel(params.id)
      dispatchSelectChannel(channelId)
    }
  }, [currentChannelId, params])

  useEffect(() => {
    const ref = wrapperRef.current

    if (ref && (!prevMessageLength || messages.length > prevMessageLength)) {
      ref.scrollTop = ref.scrollHeight - ref.clientHeight
    }

    return () => { prevMessageLength = 0 }
  }, [messages])

  const onShowViewUserModal = (userId) => {
    dispatchUpdateViewUserId(userId)
  }

  const acceptInvitation = useCallback(() => {
    dispatchRequestAcceptInvitedChannel(currentChannelId)
  }, [currentChannelId])

  return (
    <>
      {isInvitedRoom
        ? <InviteMessage acceptInvitation={acceptInvitation} />
        : (
          <RoomContainerWrapper ref={wrapperRef} onScroll={onScroll}>
            <MessageList>
              {messages.map((message, i) => (
                <MessageItem
                  onShowViewUserModal={() => onShowViewUserModal(message.userId)}
                  key={i}
                  message={message}
                  position={message.userId === user._id ? 'right' : 'left'}
                />
              ))}
            </MessageList>
          </RoomContainerWrapper>
        )}
    </>
  )
}

export default memo(connect(
  state => ({
    user: state.app.user,
    messages: state.user.messages,
    currentChannelId: state.user.currentChannelId,
    currentChannel: userSelectors.getUserChannel(state),
  }),
  {
    dispatchFetchMessage: userActions.dispatchFetchMessage,
    dispatchSelectChannel: userActions.dispatchSelectChannel,
    dispatchLastReadMessage: userActions.dispatchLastReadMessage,
    dispatchUpdateViewUserId: appActions.dispatchUpdateViewUserId,
    dispatchRequestAcceptInvitedChannel: userActions.dispatchRequestAcceptInvitedChannel,
  }
)(RoomContainer))
