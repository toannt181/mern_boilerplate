import styled from 'styled-components'

export const LetterAvatarWrapper = styled.div`
  width: 48px;
  height: 48px;
  color: ${({ theme, active }) => active ? theme.colors.white : theme.colors.gray9};
  background-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.gray15};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 16px;
  border-radius: ${({ theme }) => theme.radius.medium};
`
