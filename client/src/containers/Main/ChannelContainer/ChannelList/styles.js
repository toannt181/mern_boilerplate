import styled from 'styled-components'
import { rgba } from 'polished'

export const ChannelListWrapper = styled.div`
  padding: 12px;

  .channel-list {

  }
`

export const ChannelTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 4px;
`
export const ChannelItem = styled.div`
  background: ${({ theme, active }) => active ? rgba(theme.colors.gray3, 0.32) : 'initial'};
  padding: 4px 8px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => rgba(theme.colors.gray3, 0.32)};
  }
`
