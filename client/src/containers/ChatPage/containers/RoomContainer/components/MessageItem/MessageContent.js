import React from 'react'
import styled from 'styled-components'
import { formatDate } from 'utils/formatDate'
export const MessageContentWrapper = styled.div`
  flex: 1;
  text-align: ${({ position }) => position};
  margin-left: 8px;
  margin-right: 8px;
  ${({ position }) => position === 'left' ? 'margin-right' : 'margin-left'}: 50%;
  

  .message-name {
    color: ${({ theme }) => theme.colors.gray5};
    font-size: ${({ theme }) => theme.size.small};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 1;
  }

  .message-date {
    margin-left: 4px;
    color: ${({ theme }) => theme.colors.gray9};
    font-size: ${({ theme }) => theme.size.tiny};
  }

  .message-user-name:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .message-chat {
    color: ${({ theme }) => theme.colors.gray7};
  }
`

const RoomContainer = ({ message, position, onClick }) => (
  <MessageContentWrapper position={position}>
    <div className="message-name" >
      <span className="message-user-name" onClick={onClick}>{message.user ? message.user.name : ''}</span>
      <span className="message-date">{formatDate(message.createdAt)}</span>
    </div>
    <div className="message-chat">{message.content}</div>
  </MessageContentWrapper>
)

export default RoomContainer
