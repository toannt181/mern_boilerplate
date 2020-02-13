import React from 'react'
import styled from 'styled-components'
import { USER_STATUS } from 'configs/constants'

const LetterAvatarWrapper = styled.div`
  width: 48px;
  height: 48px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, color }) => color ? `#${color}` : theme.colors.gray14};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border-radius: ${({ theme }) => theme.radius.medium};
  cursor: pointer;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;

  &.active {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &.is-medium {
    width: 40px;
    height: 40px;
  }

  &.is-small {
    font-size: ${({ theme }) => theme.size.small};
    width: 32px;
    height: 32px;
  }
`

export const CircleStatus = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.white};

  &.active {
    background: ${({ theme }) => theme.colors.green1};
  }

  &.offline {
    background: ${({ theme }) => theme.colors.gray14};
  }

  &.pending {
    background: ${({ theme }) => theme.colors.red};
  }
`

const getStatus = (status) => {
  switch (status) {
    case USER_STATUS.ONLINE:
      return <CircleStatus className="active" />
    case USER_STATUS.PENDING:
      return <CircleStatus className="pending" />
    case USER_STATUS.OFFLINE:
      return <CircleStatus className="offline" />
    default:
      return null
  }
}

function LetterAvatar({ children, color = '', background = null, status = 0, ...rest }) {
  return (
    <LetterAvatarWrapper color={color} background={background} {...rest}>
      {!background && children}
      {getStatus(status)}
    </LetterAvatarWrapper>
  )
}

export default LetterAvatar
