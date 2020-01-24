import React from 'react'
import { connect } from 'react-redux'
import {
  Redirect,
  Route,
} from 'react-router-dom'

function AuthenticateRoute(props) {
  const { user } = props

  return user && user._id
    ? <Route {...props} />
    : <Redirect to="/login" />
}

export default connect(
  state => ({ user: state.app.user }),
)(AuthenticateRoute)
