import React, { useState } from 'react'
import {
  MessageList,
  RoomContainerWrapper,
  ChatInputWrapper,
  Title,
} from './styles'

import MessageItem from './MessageItem'

const RoomContainer = (props) => {
  const {
    currentChannel,
    messages,
    onSendMessage,
    user,
  } = props
  const [content, setContent] = useState('')

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSendMessage(content)
      setContent('')
    }
  }

  const onChange = (e) => {
    setContent(e.target.value)
  }

  return (
    <RoomContainerWrapper>
      {currentChannel ?
        <>
          <MessageList>
            {messages.map((message, i) => <MessageItem key={i} message={message} position={message.createdBy === user._id ? 'right' : 'left'} />)}
          </MessageList>
          <ChatInputWrapper>
            <input className="chat-input" onKeyDown={onKeyDown} onChange={onChange} value={content} />
          </ChatInputWrapper>
        </>
        : <Title className="is-3">Select channel</Title>
      }
    </RoomContainerWrapper>
  )
}

export default RoomContainer
