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
import PageNotFound from '../../containers/PageNotFound'

function MainLayout() {
  return (
    <MainWrapper>
      <SideMenu />
      <main>
        <Switch>
          <Route path="/channels" component={ChatPage} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    </MainWrapper>
  )
}

export default withRouter(memo(MainLayout))
