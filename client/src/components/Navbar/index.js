import React, { useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Logo from 'components/Logo'

import UserStatus from './UserStatus'
import { actions as appActions } from 'slices/appSlice'

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  z-index: ${({ theme }) => theme.index.navbar};
  padding: 16px 28px;
  box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.05);
  position: sticky;
  left: 0;
  top: 0;

  .control {
    margin-left: 24px;
    width: 400px;

    .input {
      border: none;
      box-shadow: none;
    }
  }

  .left-side {
    display: flex;
    align-items: center;
    flex: 1;
  }
`

function Navbar({ user, history, dispatchSetUser }) {
  const onClickLogout = useCallback(() => {
    localStorage.clear()
    dispatchSetUser(null)
  }, [dispatchSetUser])

  return (
    <NavWrapper>
      <div className="left-side">
        <Logo onClick={() => history.push('/')} iconOnly className="text-center" size="big" />
        <div className="control has-icons-left has-icons-right mr-4">
          <input className="input" type="text" placeholder="Search" />
          <span className="icon is-small is-left">
            <i className="fa fa-search" />
          </span>
        </div>
      </div>
      <UserStatus user={user} onClickLogout={onClickLogout} />
    </NavWrapper>
  )
}

export default withRouter(connect(
  state => ({
    user: state.app.user,
  }),
  {
    dispatchSetUser: appActions.dispatchSetUser,
  }
)(Navbar))
