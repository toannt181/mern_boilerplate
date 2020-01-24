import React, { useCallback } from 'react'
import { connect } from 'react-redux'

import { actions } from '../App/slice'
import SideMenu from '../../components/SideMenu'
import ChannelContainer from './ChannelContainer'
import RoomContainer from './RoomContainer'
import { MainWrapper } from './styles'

function Main({ user, dispatchSetUser }) {
  const onClickLogout = useCallback(() => {
    localStorage.clear()
    dispatchSetUser(null)
  }, [dispatchSetUser])

  return (
    <MainWrapper>
      <SideMenu />
      <ChannelContainer user={user} onClickLogout={onClickLogout} />
      <RoomContainer />
    </MainWrapper>
  )
}

export default connect(
  state => ({ user: state.app.user }),
  { dispatchSetUser: actions.dispatchSetUser }
)(Main)
