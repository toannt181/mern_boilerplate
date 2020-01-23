import React from 'react'
import {
  MessageList,
  RoomContainerWrapper,
  ChatInputWrapper,
} from './styles'

import MessageItem from './MessageItem'

const RoomContainer = () => (
  <RoomContainerWrapper>
    <MessageList>
      {Array(100).fill().map((_, i) => <MessageItem key={i} />)}
    </MessageList>
    <ChatInputWrapper>
      <input className="chat-input" />
    </ChatInputWrapper>
  </RoomContainerWrapper>
)

export default RoomContainer
