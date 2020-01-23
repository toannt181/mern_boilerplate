import { fork } from 'redux-saga/effects'
import appSaga from './containers/App/sagas'
import loginSaga from './containers/LoginPage/sagas'

export default function* sagas() {
  yield fork(appSaga)
  yield fork(loginSaga)
}
