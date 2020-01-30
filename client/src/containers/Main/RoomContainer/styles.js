import styled from 'styled-components'

export const RoomContainerWrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: auto;
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const ChatInputWrapper = styled.div`
  background: ${({ theme }) => theme.colors.gray3};
  padding: 8px;
  border-radius: 4px;
  flex-shrink: 0;
  position: fixed;
  bottom: 12px;
  left: 316px;
  right: 28px;

  .chat-input {
    color: ${({ theme }) => theme.colors.gray14};
    width: 100%;
  }
`

export const MessageList = styled.div`
  flex: 1;
  padding-bottom: 36px;
`

export const Title = styled.h3`
  text-align: center;
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`
