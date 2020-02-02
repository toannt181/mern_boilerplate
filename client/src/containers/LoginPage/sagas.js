import { put, takeEvery } from 'redux-saga/effects'
import { actions } from './../App/slice'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../configs/constants'
import * as UserAPI from '../../api/UserAPI'

function* watchFetchUser() {
  const user = yield UserAPI.fetchUser()
  yield put(actions.dispatchSetUser(user))
}

function* watchCreateUser(action) {
  const { payload, callback } = action.payload
  yield UserAPI.createUser(payload)
  callback()
}

function* watchLogin(action) {
  const { accessToken, refreshToken } = yield UserAPI.login(action.payload)
  localStorage.setItem(ACCESS_TOKEN, accessToken)
  localStorage.setItem(REFRESH_TOKEN, refreshToken)
  yield put(actions.dispatchFetchUser())
}

function* watchVerifyEmail(action) {
  yield UserAPI.verifyEmail(action.payload)
}

export default function* sagas() {
  yield takeEvery(actions.dispatchFetchUser.type, watchFetchUser)
  yield takeEvery(actions.dispatchCreateUser.type, watchCreateUser)
  yield takeEvery(actions.dispatchLogin.type, watchLogin)
  yield takeEvery(actions.dispatchVerifyEmail.type, watchVerifyEmail)
}
