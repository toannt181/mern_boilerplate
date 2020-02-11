import React from 'react'
import { withRouter } from 'react-router-dom'
import LetterAvatar from '../LetterAvatar'
import { SideMenuWrapper } from './styles'

function isActive(pathname, target) {
  if (target === '/') {
    return pathname === '/'
  }
  return pathname.includes(target)
}

const LIST = [
  { iconClass: 'fa fa-th-large', path: '/' },
  { iconClass: 'fa fa-users', path: '/channels' },
  { iconClass: 'fa fa-exclamation-circle', path: '/info' },
  { iconClass: 'fa fa-cog', path: '/setting' },
]

function SideMenu({ location, history }) {
  const { pathname } = location

  return (
    <SideMenuWrapper>
      {LIST.map((item, index) => (
        <LetterAvatar
          key={index}
          onClick={() => history.push(item.path)}
          className={isActive(pathname, item.path) ? 'active' : ''}
        >
          <i className={item.iconClass} />
        </LetterAvatar>
      ))}

    </SideMenuWrapper>
  )
}

export default withRouter(SideMenu)
