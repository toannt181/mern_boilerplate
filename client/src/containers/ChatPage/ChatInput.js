import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import EmojiDropdown from 'components/EmojiDropdown'

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
    margin: 0 8px;
    color: ${({ theme }) => theme.colors.gray5};
    flex: 1;
  }

  .btn-none {
    color: ${({ theme }) => theme.colors.primary};

    .fa {
      font-size: 28px;
    }
  }

  .btn-add {
    width: 32px;
    border-radius: ${({ theme }) => theme.radius.xsmall};

    .fa {
      font-size: 20px;
    }
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

  const [isShowEmojiDropdown, toggleEmojiDropdown] = useState(false)

  const onKeyDown = (e) => {
    if (isOnCompositionStart || !content.trim()) return
    if (e.key === 'Enter') {
      onEnter()
    }
  }

  const onChangeText = (e) => {
    onChange(e.target.value)
  }

  const onClickEmoji = (emoji) => {
    onChange(`${content}${emoji}`)
  }

  const onClickButtonEmoji = () => {
    toggleEmojiDropdown(state => !state)
  }

  return (
    <ChatInputWrapper className="d-center">
      <button className="btn-add button is-small is-primary"><i className="fa fa-plus" aria-hidden="true" /></button>
      <input
        ref={inputRef}
        className="chat-input"
        onKeyDown={onKeyDown}
        onChange={onChangeText}
        value={content}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      />
      <EmojiDropdown onClick={onClickEmoji} isActive={isShowEmojiDropdown}>
        <button className="btn-none" onClick={onClickButtonEmoji}><i className="fa fa-smile-o" aria-hidden="true" /></button>
      </EmojiDropdown>
    </ChatInputWrapper>
  )
}

export default ChatInput
