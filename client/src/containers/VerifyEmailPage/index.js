import React, { useEffect } from 'react'
import { LoginPageWrapper } from '../LoginPage/styles'
import { actions } from '../App/slice'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

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
      <div className="login-form">
        <div className="text-center mb-4">
          <h2>Welcome back!</h2>
          <h5>Your email has been verified</h5>
          <button type="button" className="mt-2 button is-primary is-light is-fullwidth" onClick={onClickToLogin}>Back to login</button>
        </div>
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
