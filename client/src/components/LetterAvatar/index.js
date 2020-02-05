import React from 'react'
import { LetterAvatarWrapper } from './styles'

function LetterAvatar({ children, ...rest }) {
  return (
    <LetterAvatarWrapper {...rest}>
      {children}
    </LetterAvatarWrapper>
  )
}

export default LetterAvatar
