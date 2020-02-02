import React from 'react'
import { LoginPageWrapper } from '../LoginPage/styles'

function WaitVerifyEmailPage() {
  return (
    <LoginPageWrapper>
      <div className="login-form">
        <div className="text-center mb-4">
          <h2>Welcome back!</h2>
          <h5>Please check your email to verify your account</h5>
        </div>
      </div>
    </LoginPageWrapper>
  )
}

export default WaitVerifyEmailPage
