import React from 'react'
import LetterAvatar from '../LetterAvatar'
import { SideMenuWrapper } from './styles'

function SideMenu() {
  return (
    <SideMenuWrapper>
      {Array(10).fill().map((_, i) => <LetterAvatar letter={i} />)}
    </SideMenuWrapper>
  )
}

export default SideMenu
