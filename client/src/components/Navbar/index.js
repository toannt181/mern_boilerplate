import React, { useCallback } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import UserStatus from './UserStatus'
import { actions as appActions } from 'slices/appSlice'

export const NavWrapper = styled.div`
  padding: 16px 40px 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .control {
    width: 400px
  }
`

function Navbar({ user, dispatchSetUser }) {
  const onClickLogout = useCallback(() => {
    localStorage.clear()
    dispatchSetUser(null)
  }, [dispatchSetUser])

  return (
    <NavWrapper>
      <div className="control has-icons-left has-icons-right mr-4">
        <input className="input" type="text" placeholder="Search" />
        <span className="icon is-small is-left">
          <i className="fa fa-search" />
        </span>
      </div>
      <UserStatus user={user} onClickLogout={onClickLogout} />
    </NavWrapper>
  )
}

export default connect(
  state => ({
    user: state.app.user,
  }),
  {
    dispatchSetUser: appActions.dispatchSetUser,
  }
)(Navbar)
