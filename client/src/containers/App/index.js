import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import { actions } from './slice'
import { selectUsername } from './selectors'
import GlobalStyle from './globalStyle'
import Main from '../Main'

function App({ user, fetchUser, fullname }) {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route component={Main} />
        </Switch>
      </Router>
    </>
  )
}

export default connect(
  state => ({ user: state.app.user, fullname: selectUsername(state) }),
  actions
)(App)
