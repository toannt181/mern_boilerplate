import React from 'react'
import { connect } from 'react-redux'

// import { actions } from './slice'
// import { selectUsername } from './selectors'
import Navbar from '../../components/Navbar'
import SideMenu from '../../components/SideMenu'
import ChannelContainer from './ChannelContainer'
import RoomContainer from './RoomContainer'
import { MainWrapper } from './styles'

function Main({ user, fetchUser, fullname }) {
  return (
    <MainWrapper>
      {/* <Navbar /> */}
      <SideMenu />
      <ChannelContainer />
      <RoomContainer />
    </MainWrapper>
  )
}

export default connect(
  // state => ({ user: state.app.user, fullname: selectUsername(state) }),
  // actions
)(Main)
