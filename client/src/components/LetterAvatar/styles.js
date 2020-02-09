import styled from 'styled-components'

export const LetterAvatarWrapper = styled.div`
  width: 48px;
  height: 48px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, color }) => color ? `#${color}` : theme.colors.gray14};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 16px;
  border-radius: ${({ theme }) => theme.radius.medium};
  cursor: pointer;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;

  &.active {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
  }
`
