import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

export const MemberJoinMessageWrapper = styled.div`
  background: ${({ theme }) => rgba(theme.colors.primary, 0.2)};
  border-radius: ${({ theme }) => theme.radius.xsmall};
  padding: 4px 12px;
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.size.small};

  .name {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const MemberJoinMessage = ({ message, text }) => (
  <MemberJoinMessageWrapper>
    <span className="name">{message.user.name}</span> {text}
  </MemberJoinMessageWrapper>
)

export default MemberJoinMessage
