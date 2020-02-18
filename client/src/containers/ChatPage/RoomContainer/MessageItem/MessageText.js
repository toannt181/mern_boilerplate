import React from 'react'
import {
  MessageItemWrapper,
} from './styles'
import MessageAvatar from './MessageAvatar'
import MessageContent from './MessageContent'

const MessageText = ({ message, position, onShowViewUserModal }) => position === 'left'
  ? (
    <MessageItemWrapper>
      <MessageAvatar user={message.user} onClick={onShowViewUserModal} />
      <MessageContent message={message} position={position} onClick={onShowViewUserModal} />
    </MessageItemWrapper>
  )
  : (
    <MessageItemWrapper>
      <MessageContent message={message} position={position} onClick={onShowViewUserModal} />
      <MessageAvatar user={message.user} onClick={onShowViewUserModal} />
    </MessageItemWrapper>
  )

export default MessageText
