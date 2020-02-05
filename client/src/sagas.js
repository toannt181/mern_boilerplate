import { fork } from 'redux-saga/effects'
import loginSaga from './services/loginService'
import messageService from './services/messageService'

export default function* sagas() {
  yield fork(loginSaga)
  yield fork(messageService)
}
