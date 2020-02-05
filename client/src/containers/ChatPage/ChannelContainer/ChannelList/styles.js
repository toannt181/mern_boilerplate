import styled from 'styled-components'

export const ChannelListWrapper = styled.div`
  padding: 16px;

  .channel-list {
    margin-top: 8px;
  }
`

export const ChannelTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 4px;
`

export const ChannelItem = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.gray5};
  padding: 8px;
  margin: 8px 0 8px -8px;
  border-radius: ${({ theme }) => theme.radius.small};
  cursor: pointer;
  transition-duration: .25s;

  &.active {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  &.highlight {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  .badge {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }

  .channel-id {
    color: ${({ theme }) => theme.colors.gray14};
    font-size: ${({ theme }) => theme.size.tiny};
  }
`
