import React from 'react'
import {
  MessageItemWrapper,
} from './styles'
import MessageAvatar from './MessageAvatar'
import MessageContent from './MessageContent'

const MessageText = ({ message, position }) => position === 'left'
  ? (
    <MessageItemWrapper>
      <MessageAvatar user={message.user} />
      <MessageContent message={message} position={position} />
    </MessageItemWrapper>
  )
  : (
    <MessageItemWrapper>
      <MessageContent message={message} position={position} />
      <MessageAvatar user={message.user} />
    </MessageItemWrapper>
  )

export default MessageText
