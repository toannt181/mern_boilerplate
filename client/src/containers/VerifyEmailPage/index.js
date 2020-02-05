import React, { useEffect } from 'react'
import { LoginPageWrapper } from '../LoginPage/styles'
import { actions } from '../../slices/appSlice'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Logo from '../../components/Logo'
import LoginIntroduction from '../LoginPage/LoginIntroduction'

function VerifyEmailPage({ history, match, dispatchVerifyEmail, location }) {
  const onClickToLogin = () => {
    history.push('/login')
  }

  useEffect(() => {
    const code = location.search.replace('?code=', '') || ''
    dispatchVerifyEmail({ code })
  }, [dispatchVerifyEmail, location])

  return (
    <LoginPageWrapper>
      <div className="login-container">
        <div className="login-form">
          <Logo className="mb-8" />
            <h2 className="title is-2">Welcome back!</h2>
            <p className="sub-description">Your email has been verified</p>
            <button type="button" className="mt-2 button is-primary is-light is-fullwidth" onClick={onClickToLogin}>Back to login</button>
          </div>
        <LoginIntroduction />
      </div>
    </LoginPageWrapper>
  )
}

export default withRouter(connect(
  state => ({ user: state.app.user }),
  {
    dispatchVerifyEmail: actions.dispatchVerifyEmail,
  },
)(VerifyEmailPage))
