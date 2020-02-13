import { put, takeEvery } from 'redux-saga/effects'
import { actions as appActions } from '../slices/appSlice'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../configs/constants'
import * as UserAPI from '../api/UserAPI'

function* watchFetchUser() {
  const user = yield UserAPI.fetchUser()
  yield put(appActions.dispatchSetUser(user))
}

function* watchCreateUser(action) {
  try {
    const { payload, callback } = action.payload
    yield UserAPI.createUser(payload)
    callback()
  } catch { }
}

function* watchLogin(action) {
  try {
    const { accessToken, refreshToken } = yield UserAPI.login(action.payload)
    localStorage.setItem(ACCESS_TOKEN, accessToken)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
    yield put(appActions.dispatchFetchUser())
  } catch { }
}

function* watchVerifyEmail(action) {
  try {
    yield UserAPI.verifyEmail(action.payload)
  } catch { }
}

function* watchEmitConnectedUser(action) {
  try {
    yield UserAPI.emitConnectedUser(action.payload)
  } catch { }
}

export default function* sagas() {
  yield takeEvery(appActions.dispatchFetchUser.type, watchFetchUser)
  yield takeEvery(appActions.dispatchCreateUser.type, watchCreateUser)
  yield takeEvery(appActions.dispatchLogin.type, watchLogin)
  yield takeEvery(appActions.dispatchVerifyEmail.type, watchVerifyEmail)
  yield takeEvery(appActions.dispatchEmitConnectedUser.type, watchEmitConnectedUser)
}
