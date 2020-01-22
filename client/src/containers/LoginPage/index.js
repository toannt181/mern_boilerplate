import React from 'react'
import { connect } from 'react-redux'
import { LoginPageWrapper } from './styles'

function LoginPage({ user, fetchUser, fullname }) {
  return (
    <LoginPageWrapper>
      <div className="login-form">
        <div className="text-center mb-4">
          <h2>Welcome back!</h2>
          <h5>We're so excited to see you again!</h5>
        </div>
        {/* <label className="login-label">Email</label>
        <input className="input mb-2" />
        <label className="login-label">Password</label>
        <input className="input mb-4" /> */}
        <label className="login-label">Name</label>
        <input className="input mb-4" />
        <button className="btn primary block">Login</button>
      </div>
    </LoginPageWrapper>
  )
}

export default connect(
  // state => ({ user: state.app.user, fullname: selectUsername(state) }),
  // actions
)(LoginPage)
