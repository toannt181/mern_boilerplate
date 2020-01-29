import React, { useState, useEffect, useRef } from 'react'
import {
  MessageList,
  RoomContainerWrapper,
  ChatInputWrapper,
  Title,
} from './styles'

import MessageItem from './MessageItem'

import usePrevious from '../../../utils/usePrevious'

const RoomContainer = (props) => {
  const {
    currentChannel,
    messages,
    onSendMessage,
    user,
  } = props
  const [content, setContent] = useState('')
  const prevProps = usePrevious({ messages })
  const wrapperRef = useRef()

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSendMessage(content)
      setContent('')
    }
  }

  const onChange = (e) => {
    setContent(e.target.value)
  }

  useEffect(() => {
    if (prevProps && messages.length > prevProps.messages.length) {
      const ref = wrapperRef.current

      ref.scrollTop = ref.scrollHeight - ref.clientHeight
    }
  }, [messages])

  return (
    <RoomContainerWrapper ref={wrapperRef}>
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
