import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Switch,
  Route,
} from 'react-router-dom'

import SideMenu from 'components/SideMenu'
import { MainWrapper } from './styles'
import ChatPage from 'containers/ChatPage'
import PageNotFound from 'containers/PageNotFound'
import UserPage from 'containers/UserPage'
import NewsPage from 'containers/NewsPage'
import Navbar from 'components/Navbar'

function MainLayout() {
  return (
    <MainWrapper>
      <Navbar />
      <main className="main">
        <SideMenu />
        <div className="main-content">
          <Switch>
            <Route path="/channels" component={ChatPage} />
            <Route path="/user" component={UserPage} />
            <Route exact path="/" component={NewsPage} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </main>
    </MainWrapper>
  )
}

export default withRouter(memo(MainLayout))
