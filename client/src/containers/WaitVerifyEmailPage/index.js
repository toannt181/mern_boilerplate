import React from 'react'
import { LoginPageWrapper } from '../LoginPage/styles'
import Logo from '../../components/Logo'
import LoginIntroduction from '../LoginPage/LoginIntroduction'

function WaitVerifyEmailPage() {
  return (
    <LoginPageWrapper>
      <div className="login-container">
        <div className="login-form">
          <Logo className="mb-8" />
          <h2 className="title is-2">Welcome back!</h2>
          <p className="sub-description">Please check your email to verify your account</p>
        </div>
        <LoginIntroduction />
      </div>
    </LoginPageWrapper>
  )
}

export default WaitVerifyEmailPage
