import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Switch,
  Route,
} from 'react-router-dom'

import SideMenu from '../../components/SideMenu'
import { MainWrapper } from './styles'
import '../../configs/socket'
import ChatPage from '../../containers/ChatPage'

function MainLayout() {
  return (
    <MainWrapper>
      <SideMenu />
      <main>
        <Switch>
          <Route path="/channels" component={ChatPage} />
          <Route component={() => <h1>404</h1>} />
        </Switch>
      </main>
    </MainWrapper>
  )
}

export default withRouter(memo(MainLayout))
