import React from 'react'
import styled from 'styled-components'

export const MessageContentWrapper = styled.div`
  flex: 1;
  text-align: ${({ position }) => position};
  margin-left: 8px;
  margin-right: 8px;
  ${({ position }) => position === 'left' ? 'margin-right': 'margin-left'}: 50%;
  

  .message-name {
    color: ${({ theme }) => theme.colors.gray5};
    font-size: ${({ theme }) => theme.size.small};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .message-date {
    color: ${({ theme }) => theme.colors.gray5};
    font-size: ${({ theme }) => theme.size.tiny};
  }

  .message-chat {
    color: ${({ theme }) => theme.colors.gray7};
  }
`

const RoomContainer = ({ message, position }) => (
  <MessageContentWrapper position={position}>
    <div className="message-name">{message.user ? message.user.name : ''}
      {/* <span className="message-date">1pm 12/12/2012</span> */}
    </div>
    <div className="message-chat">{message.content}</div>
  </MessageContentWrapper>
)

export default RoomContainer
