import styled from 'styled-components'

export const SideMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;
  background: ${({ theme }) => theme.colors.white};
  position: fixed;
  left: 0;
  top: 80px;
  bottom: 0;
`