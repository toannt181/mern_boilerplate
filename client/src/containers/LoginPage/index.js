import React, { useState, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { LoginPageWrapper } from './styles'
import { actions } from '../App/slice'
import { withRouter } from 'react-router-dom'

function LoginPage(props) {
  const { dispatchCreateUser, history, user, dispatchLogin } = props
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [isSignupForm, setShowSignupForm] = useState(false)

  const onChangeValue = useCallback((e) => {
    const { target } = e
    setForm((data) => ({ ...data, [target.dataset.name]: target.value }))
  }, [])

  const createUser = useCallback((e) => {
    e.preventDefault()
    dispatchCreateUser({
      payload: form,
      callback: () => {
        history.push('/wait-verify')
      },
    })
  }, [dispatchCreateUser, form, history])

  const loginUser = useCallback((e) => {
    e.preventDefault()
    dispatchLogin(form)
  }, [form, dispatchLogin])

  const onToggleViewSignUp = useCallback((e) => {
    setShowSignupForm((state) => !state)
  }, [])

  useEffect(() => {
    if (user) {
      if (user.isVerified) {
        history.push('/')
      } else {
        history.push('/wait-verify')
      }
    }
  }, [user, history])

  return (
    <LoginPageWrapper>
      <div className="login-form">
        <div className="text-center mb-4">
          <h2>Welcome back!</h2>
          <h5>We're so excited to see you again!</h5>
        </div>
        {isSignupForm
          ? (
            <form onSubmit={createUser}>
              <label className="login-label">Email</label>
              <input className="input mb-2" type="email" required value={form.email} onChange={onChangeValue} data-name="email" />
              <label className="login-label">Name</label>
              <input className="input mb-2" type="text" required value={form.name} onChange={onChangeValue} data-name="name" />
              <label className="login-label">Password</label>
              <input className="input" type="password" required value={form.password} onChange={onChangeValue} data-name="password" />
              <div className="btn-group d-center">
                <button type="button" className="mr-2 button is-primary is-light is-fullwidth" onClick={onToggleViewSignUp}>Back to login</button>
                <button type="submit" className="ml-2 button is-primary is-fullwidth">Signup</button>
              </div>
            </form>
          )
          : (
            <form onSubmit={loginUser}>
              <label className="login-label">Email</label>
              <input className="input mb-2" type="email" required value={form.email} onChange={onChangeValue} data-name="email" />
              <label className="login-label">Password</label>
              <input className="input" type="password" required value={form.password} onChange={onChangeValue} data-name="password" />
              <div className="btn-group d-center">
                <button type="button" className="mr-2 button is-primary is-light is-fullwidth" onClick={onToggleViewSignUp}>Signup</button>
                <button type="submit" className="ml-2 button is-primary is-fullwidth">Login</button>
              </div>
            </form>
          )
        }
      </div>
    </LoginPageWrapper>
  )
}

export default withRouter(connect(
  state => ({ user: state.app.user }),
  {
    dispatchCreateUser: actions.dispatchCreateUser,
    dispatchLogin: actions.dispatchLogin,
  },
)(LoginPage))
