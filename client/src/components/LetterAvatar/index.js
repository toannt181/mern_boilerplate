import React from 'react'
import { LetterAvatarWrapper } from './styles'

function LetterAvatar({ children, color = '', background = null, ...rest }) {
  return (
    <LetterAvatarWrapper color={color} background={background} {...rest}>
      {!background && children}
    </LetterAvatarWrapper>
  )
}

export default LetterAvatar
