import React from 'react'
import {
  MessageItem,
} from './styles'

const RoomContainer = () => (
  <MessageItem>
    <div className="message-avatar">T</div>
    <div className="message-content">
      <div className="message-name">toan <span className="message-date">1pm 12/12/2012</span></div>
      <div className="message-chat">hihi say hello</div>
    </div>
  </MessageItem>
)

export default RoomContainer
