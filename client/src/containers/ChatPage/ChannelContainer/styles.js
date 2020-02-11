import styled from 'styled-components'

export const ChannelContainerWrapper = styled.div`
  height: 100%;
  width: 240px;
  border-left: 1px solid ${({ theme }) => theme.colors.gray15};
  background: ${({ theme }) => theme.colors.white};

  .title {
    margin: 32px 16px;
  }
`