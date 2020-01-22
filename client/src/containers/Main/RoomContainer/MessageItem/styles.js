import styled from 'styled-components'

export const MessageItem = styled.div`
  display: flex;
  margin-bottom: 8px;

  .message-avatar {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    margin-right: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.size.large};
    background: ${({ theme }) => theme.colors.primary};
  }

  .message-content {
    flex: 1;

    .message-name {
      font-size: ${({ theme }) => theme.size.small};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }

    .message-date {
      color: ${({ theme }) => theme.colors.gray5};
      font-size: ${({ theme }) => theme.size.tiny};
    }
  }
`