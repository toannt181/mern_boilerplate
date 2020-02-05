import React, { useRef } from 'react'
import styled from 'styled-components'

export const ChatInputWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 12px 16px;
  border-radius: 4px;
  flex-shrink: 0;
  position: absolute;
  bottom: 20px;
  left: 40px;
  right: 40px;

  .chat-input {
    color: ${({ theme }) => theme.colors.gray5};
    width: 100%;
  }
`

let isOnCompositionStart = false

const onCompositionStart = () => {
  isOnCompositionStart = true
}

const onCompositionEnd = () => {
  isOnCompositionStart = false
}


const ChatInput = (props) => {
  const {
    content,
    onEnter,
    onChange,
  } = props
  const inputRef = useRef()

  const onKeyDown = (e) => {
    if (isOnCompositionStart || !content.trim()) return
    if (e.key === 'Enter') {
      onEnter()
    }
  }

  return (
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
  )
}

export default ChatInput
