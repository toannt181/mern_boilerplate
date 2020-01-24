import { put, takeEvery } from 'redux-saga/effects'
import { actions } from './../App/slice'
import { ACCESS_TOKEN } from '../../configs/constants'
import * as UserAPI from '../../api/UserAPI'

function* watchFetchUser(action) {
  const user = yield UserAPI.createUser(action.payload)
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(user))
  yield put(actions.dispatchSetUser(user))
}

export default function* sagas() {
  yield takeEvery(actions.dispatchCreateUser.type, watchFetchUser)
}
