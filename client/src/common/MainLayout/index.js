import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Switch,
  Route,
} from 'react-router-dom'

import SideMenu from 'components/SideMenu'
import { MainWrapper } from './styles'
import 'configs/socket'
import ChatPage from 'containers/ChatPage'
import PageNotFound from 'containers/PageNotFound'
import UserPage from 'containers/UserPage'
import Navbar from 'components/Navbar'

function MainLayout() {
  return (
    <MainWrapper>
      <SideMenu />
      <main>
        <Navbar />
        <Switch>
          <Route path="/channels" component={ChatPage} />
          <Route path="/user" component={UserPage} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    </MainWrapper>
  )
}

export default withRouter(memo(MainLayout))
