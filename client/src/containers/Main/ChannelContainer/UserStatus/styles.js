import styled from 'styled-components'

export const UserStatusWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  padding: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`