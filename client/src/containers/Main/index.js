import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { actions as appActions } from '../App/slice'
import { actions } from './slice'
import SideMenu from '../../components/SideMenu'
import ChannelContainer from './ChannelContainer'
import RoomContainer from './RoomContainer'
import ChannelModal from './ChannelModal'
import { MainWrapper } from './styles'

function Main({ user, dispatchSetUser, channels, dispatchCreateChannel, dispatchFetchChannel }) {
  const [isShowChannelModal, toggleChannelModal] = useState(false)

  useEffect(() => {
    dispatchFetchChannel()
  }, [])

  const onClickLogout = useCallback(() => {
    localStorage.clear()
    dispatchSetUser(null)
  }, [dispatchSetUser])

  const onAddChannel = useCallback(() => {
    toggleChannelModal(state => !state)
  }, [toggleChannelModal])

  const onCreateChannel = useCallback((name) => {
    dispatchCreateChannel({ name })
    toggleChannelModal(false)
  }, [dispatchCreateChannel])

  return (
    <MainWrapper>
      <SideMenu />
      <ChannelContainer
        user={user}
        onClickLogout={onClickLogout}
        channels={channels}
        onAddChannel={onAddChannel}
      />
      <RoomContainer />
      {isShowChannelModal && (
        <ChannelModal
          onCloseModal={onAddChannel}
          onCreateChannel={onCreateChannel}
        />
      )}
    </MainWrapper>
  )
}

export default connect(
  state => ({
    user: state.app.user,
    channels: state.main.channels,
  }),
  {
    dispatchSetUser: appActions.dispatchSetUser,
    dispatchCreateChannel: actions.dispatchCreateChannel,
    dispatchFetchChannel: actions.dispatchFetchChannel,
  }
)(Main)
