import React from 'react'
import { connect } from 'react-redux'

import { actions } from './slice'
import { selectUsername } from './selectors'
import GlobalStyle from './globalStyle'

function App({ user, fetchUser, fullname }) {
  return (
    <div>
      <GlobalStyle />
      <h1>Run ok {user}</h1>
      <h2>fullname {fullname}</h2>
      <button onClick={fetchUser}>OK</button>
    </div>
  )
}

export default connect(
  state => ({ user: state.app.user, fullname: selectUsername(state) }),
  actions
)(App)
