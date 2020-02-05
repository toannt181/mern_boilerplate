import React from 'react'
import LetterAvatar from '../LetterAvatar'
import Logo from '../Logo'
import { SideMenuWrapper } from './styles'

function SideMenu() {
  return (
    <SideMenuWrapper>
      <Logo iconOnly className="text-center mb-8" size="big" />
      <LetterAvatar active>
        <i className="fa fa-th-large" />
      </LetterAvatar>
      <LetterAvatar>
        <i className="fa fa-users" />
      </LetterAvatar>
      <LetterAvatar>
        <i className="fa fa-exclamation-circle" />
      </LetterAvatar>
    </SideMenuWrapper>
  )
}

export default SideMenu
