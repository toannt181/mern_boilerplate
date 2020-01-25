import { fork } from 'redux-saga/effects'
import appSaga from './containers/App/sagas'
import loginSaga from './containers/LoginPage/sagas'
import mainSaga from './containers/Main/sagas'

export default function* sagas() {
  yield fork(appSaga)
  yield fork(loginSaga)
  yield fork(mainSaga)
}
