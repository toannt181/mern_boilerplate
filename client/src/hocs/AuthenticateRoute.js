import React from 'react'
import { connect } from 'react-redux'
import {
  Redirect,
  Route,
} from 'react-router-dom'

function AuthenticateRoute(props) {
  const { user } = props

  if (!user || !user._id) {
    return <Redirect to="/login" />
  }

  if (!user.isVerified) {
    return <Redirect to="/wait-verify" />
  }

  return <Route {...props} />
}

export default connect(
  state => ({ user: state.app.user }),
)(AuthenticateRoute)
