import React from 'react'
import styled from 'styled-components'

export const MessageAvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.size.large};
  background: ${({ color, theme }) => `#${color}` || theme.colors.primary};
  border: 1px solid;
  border-color: ${({ color, theme }) => `#${color}` || theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`

const MessageAvatar = ({ user }) => (
  <MessageAvatarWrapper color={user.avatar}>{user ? user.name[0] : ''}</MessageAvatarWrapper>
)

export default MessageAvatar
