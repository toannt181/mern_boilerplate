import React, { useState, useEffect, useRef, memo } from 'react'
import {
  MessageList,
  RoomContainerWrapper,
  ChatInputWrapper,
} from './styles'

import MessageItem from './MessageItem'

let isOnCompositionStart = false

const onCompositionStart = () => {
  isOnCompositionStart = true
}

const onCompositionEnd = () => {
  isOnCompositionStart = false
}

let prevMessageLength

const RoomContainer = (props) => {
  const {
    messages,
    onSendMessage,
    user,
    onFetchMessageChannel,
    match: { params },
  } = props

  useEffect(() => {
    if (params.id) {
      onFetchMessageChannel(params.id)
    }
  }, [onFetchMessageChannel, params])

  const [content, setContent] = useState('')
  const wrapperRef = useRef()
  const inputRef = useRef()

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
    const ref = wrapperRef.current

    if (!prevMessageLength || messages.length > prevMessageLength) {
      ref.scrollTop = ref.scrollHeight - ref.clientHeight
    }

    return () => { prevMessageLength = 0 }
  }, [messages])

  return (
    <RoomContainerWrapper ref={wrapperRef}>
      <>
        <MessageList>
          {messages.map((message, i) => <MessageItem key={i} message={message} position={message.createdBy === user._id ? 'right' : 'left'} />)}
        </MessageList>
        <ChatInputWrapper>
          <input
            ref={inputRef}
            className="chat-input"
            onKeyDown={onKeyDown}
            onChange={onChange}
            value={content}
            onCompositionStart={onCompositionStart}
            onCompositionEnd={onCompositionEnd}
          />
        </ChatInputWrapper>
      </>
    </RoomContainerWrapper>
  )
}

export default memo(RoomContainer)
