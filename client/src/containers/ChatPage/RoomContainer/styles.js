import styled from 'styled-components'

export const RoomContainerWrapper = styled.div`
  position: relative;
  overflow: auto;
  padding: 12px;
  padding-right: 48px;
  margin-right: -32px;
  height: calc(100vh - 230px);
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
