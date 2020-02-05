import React from 'react'
import {
  MessageItem,
} from './styles'
import MessageAvatar from './MessageAvatar'
import MessageContent from './MessageContent'

const RoomContainer = ({ message, position }) => position === 'left'
  ? (
    <MessageItem>
      <MessageAvatar user={message.user} />
      <MessageContent message={message} position={position} />
    </MessageItem>
  )
  : (
    <MessageItem>
      <MessageContent message={message} position={position} />
      <MessageAvatar user={message.user} />
    </MessageItem>
  )

export default RoomContainer
