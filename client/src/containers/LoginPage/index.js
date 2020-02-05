import React, { useState, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { LoginPageWrapper } from './styles'
import { actions } from '../App/slice'
import { withRouter } from 'react-router-dom'
import Logo from '../../components/Logo'
import LoginIntroduction from './LoginIntroduction'

function LoginPage(props) {
  const { dispatchCreateUser, history, user, dispatchLogin } = props
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [isSignupForm, setShowSignupForm] = useState(false)

  const onChangeValue = useCallback((e) => {
    const { target } = e
    setForm((data) => ({ ...data, [target.name]: target.value }))
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
      <div className="login-container">
        <div className="login-form">
          <Logo className="mb-8" />
          <h2 className="title is-2">Welcome back!</h2>
          <p className="sub-description">Sign in to continue</p>
          {isSignupForm
            ? (
              <form onSubmit={createUser}>
                <label className="label">Email</label>
                <input className="input mb-2" type="email" name="email" required value={form.email} onChange={onChangeValue} />
                <label className="label">Name</label>
                <input className="input mb-2" type="text" name="name" required value={form.name} onChange={onChangeValue} />
                <label className="label">Password</label>
                <input className="input" type="password" required name="password"value={form.password} onChange={onChangeValue} />
                <div className="btn-group">
                  <button type="submit" className="mb-2 button is-primary is-fullwidth">Signup</button>
                  <button type="button" className="button is-primary is-light is-fullwidth" onClick={onToggleViewSignUp}>Back to login</button>
                </div>
              </form>
            )
            : (
              <form onSubmit={loginUser}>
                <label className="label">Email</label>
                <input className="input mb-2" type="email" required value={form.email} onChange={onChangeValue} name="email" />
                <label className="label">Password</label>
                <input className="input" type="password" required value={form.password} onChange={onChangeValue} name="password" />
                <div className="btn-group">
                  <button type="submit" className="mb-2 button is-primary is-fullwidth">Login</button>
                  <button type="button" className="button is-primary is-light is-fullwidth" onClick={onToggleViewSignUp}>Signup</button>
                </div>
              </form>
            )
          }
        </div>
        <LoginIntroduction />
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
