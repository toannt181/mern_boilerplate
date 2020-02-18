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

import MessageItem from './MessageItem'
import InviteMessage from '../InviteMessage'

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
    acceptInvitation = (() => { }),
    match: { params } = {},
    dispatchLastReadMessage,
    dispatchUpdateViewUserId,
  } = props

  const wrapperRef = useRef()

  const onFetchMessageChannel = useCallback((channelId) => {
    dispatchFetchMessage({ channelId })
  },
    [
      dispatchFetchMessage,
    ]
  )

  useEffect(() => {
    const ref = wrapperRef.current
    if (!ref) return

    const onScrollAtBotom = () => {
      const lastMessage = last(messages)

      if (!lastMessage || (currentChannel && currentChannel.lastReadMessageId === lastMessage._id)) return
      const payload = {
        channelId: currentChannelId,
        lastReadMessageId: lastMessage._id,
      }
      dispatchLastReadMessage(payload)
    }

    const scrollHandle = throttle(() => {
      const isScrollAtBottom = ref.scrollTop >= ref.scrollHeight - ref.clientHeight - MINIMUM_A_MESSAGE_HEIGHT
      if (isScrollAtBottom) {
        onScrollAtBotom()
      }
      ref.addEventListener('scroll', scrollHandle)
    }, MINIMUN_DELAY)

    scrollHandle()

    return () => ref.removeEventListener('scroll', scrollHandle)
  }, [messages, currentChannelId, currentChannel, dispatchLastReadMessage])

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

  const onShowViewUserModal = (userId) => {
    dispatchUpdateViewUserId(userId)
  }

  return isInvitedRoom
    ? <InviteMessage acceptInvitation={acceptInvitation} />
    : (
      <RoomContainerWrapper ref={wrapperRef}>
        <MessageList>
          {messages.map((message, i) => <MessageItem onShowViewUserModal={() => onShowViewUserModal(message.createdBy)} key={i} message={message} position={message.createdBy === user._id ? 'right' : 'left'} />)}
        </MessageList>
      </RoomContainerWrapper>
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
  }
)(RoomContainer))
