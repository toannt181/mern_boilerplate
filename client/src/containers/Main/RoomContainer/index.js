import React, { useState, useEffect, useRef } from 'react'
import {
  MessageList,
  RoomContainerWrapper,
  ChatInputWrapper,
  Title,
} from './styles'

import MessageItem from './MessageItem'

import usePrevious from '../../../utils/usePrevious'

let isOnCompositionStart = false

const onCompositionStart = () => {
  isOnCompositionStart = true
}

const onCompositionEnd = () => {
  isOnCompositionStart = false
}

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
    if (isOnCompositionStart || !content.trim()) return
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
  }, [messages, prevProps])

  return (
    <RoomContainerWrapper ref={wrapperRef}>
      {currentChannel ?
        <>
          <MessageList>
            {messages.map((message, i) => <MessageItem key={i} message={message} position={message.createdBy === user._id ? 'right' : 'left'} />)}
          </MessageList>
          <ChatInputWrapper>
            <input
              className="chat-input"
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={content}
              onCompositionStart={onCompositionStart}
              onCompositionEnd={onCompositionEnd}
            />
          </ChatInputWrapper>
        </>
        : <Title className="is-3">Select channel</Title>
      }
    </RoomContainerWrapper>
  )
}

export default RoomContainer
