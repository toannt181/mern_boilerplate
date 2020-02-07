import React, { useState } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Dropdown from 'components/Dropdown'
import getServerPhoto from 'utils/getServerPhoto'

export const AvatarWrapper = styled.div`
  width: 48px;
  height: 48px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, color }) => color ? `#${color}` : theme.colors.primary};
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border-radius: ${({ theme }) => theme.radius.medium};
  text-transform: uppercase;
  cursor: pointer;
`

export const UserMenuWrapper = styled.div`
  .btn-none {
    width: 100%;
  }
`

const UserMenu = ({ user, onClickLogout }) => {
  return (
    <UserMenuWrapper>
      <div className="dropdown-item">
        <button className="btn-none" onClick={onClickLogout}>Logout</button>
      </div>
    </UserMenuWrapper>
  )
}

const UserStatus = ({ history, user, onClickLogout }) => {
  const [isShowUserMenu, toggleUserMenu] = useState(false)

  const onClickUserIcon = () => {
    history.push('/user')
  }

  const onClickSettingIcon = () => {
    toggleUserMenu(state => !state)
  }

  return (
    <div className="d-center">
      <p className="subtitle mr-2">{user ? user.name : 'Anonymous'}</p>
      <AvatarWrapper onClick={onClickUserIcon} color={user.avatar} background={getServerPhoto(user.thumbnail)}>{!user.thumbnail && user.name[0]}</AvatarWrapper>
      <Dropdown
        isActive={isShowUserMenu}
        menu={<UserMenu onClickLogout={onClickLogout} />}
      >
        <AvatarWrapper className="ml-2" onClick={onClickSettingIcon}>
          <i className="fa fa-cog" />
        </AvatarWrapper>
      </Dropdown>
    </div>
  )
}

export default withRouter(UserStatus)
