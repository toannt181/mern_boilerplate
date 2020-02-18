import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import AuthenticateRoute from 'hocs/AuthenticateRoute'

import { actions } from 'slices/appSlice'
import { actions as userActions } from 'slices/userSlice'
import GlobalStyle from './globalStyle'
import LoginPage from '../LoginPage'
import WarningModal from './WarningModal'
import LoadingSpinner from 'components/LoadingSpinner'
import { ACCESS_TOKEN } from 'configs/constants'
import WaitVerifyEmailPage from '../WaitVerifyEmailPage'
import VerifyEmailPage from '../VerifyEmailPage'
import UserModal from './UserModal'
import MainLayout from 'common/MainLayout'
import socket from 'configs/socket'
import usePrevious from 'utils/usePrevious'

function App(props) {
  const {
    warningData,
    dispatchWarningModal,
    appLoadingStack,
    dispatchFetchUser,
    dispatchSetUser,
    dispatchEmitConnectedUser,
    dispatchUpdateMemberStatus,
    user,
    channels,
    viewUserId,
  } = props
  const [isAppReady, setAppReady] = useState(false)
  const prevUser = usePrevious(user)

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      dispatchFetchUser()
    } else {
      dispatchSetUser(false)
    }
  }, [dispatchFetchUser, dispatchSetUser])

  useEffect(() => {
    if (user !== null) {
      setAppReady(true)
    }

    if (!prevUser && user) {
      dispatchEmitConnectedUser({ userId: user._id })

      socket.on('changeUserStatus', ({ userId, status }) => {
        dispatchUpdateMemberStatus({ userId, status })
      })
    }
  }, [user, dispatchEmitConnectedUser, dispatchUpdateMemberStatus, prevUser])

  useEffect(() => {
    socket.on('releaseVersion', ({ version, releaseNote }) => {
      dispatchWarningModal({
        visible: true,
        title: `Version ${version} has been released, please reload and enjoy!`,
        message: releaseNote,
        onClickAccept: () => window.location.reload(),
      })
    })
  }, [dispatchWarningModal])


  useEffect(() => {
    const num = setInterval(() => {
      if (document.title === 'MoveOnFlow') {
        const numberUnreadMessage = channels.reduce((total, item) => total + (item.numberNotReadMessage || 0), 0)
        if (numberUnreadMessage !== 0) {
          document.title = `${numberUnreadMessage} new messages`
          return
        }
      }
      document.title = 'MoveOnFlow'
    }, 2000)

    return () => clearInterval(num)
  }, [channels])

  return (
    <>
      <GlobalStyle />
      <Router>
        {isAppReady && (
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/wait-verify" component={WaitVerifyEmailPage} />
            <Route exact path="/verify" component={VerifyEmailPage} />
            <AuthenticateRoute component={MainLayout} />
          </Switch>
        )}
        {(!isAppReady || appLoadingStack > 0) && (<LoadingSpinner />)}
        {warningData.visible && <WarningModal {...warningData} dispatchWarningModal={dispatchWarningModal} />}
        {!!viewUserId && <UserModal />}
      </Router>
    </>
  )
}

export default connect(
  state => ({
    user: state.app.user,
    warningData: state.app.warningData,
    appLoadingStack: state.app.appLoadingStack,
    channels: state.user.channels,
    viewUserId: state.app.viewUserId,
  }),
  {
    ...actions,
    dispatchUpdateMemberStatus: userActions.dispatchUpdateMemberStatus,
  }
)(App)
