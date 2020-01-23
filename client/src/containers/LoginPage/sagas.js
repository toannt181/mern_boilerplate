import { put, takeEvery } from 'redux-saga/effects'
import { actions } from './../App/slice'
import * as UserAPI from '../../api/UserAPI'

function* watchFetchUser(action) {
  const user = yield UserAPI.createUser(action.payload)
  yield put(actions.dispatchSetUser(user))
}

export default function* sagas() {
  yield takeEvery(actions.dispatchCreateUser.type, watchFetchUser)
}
