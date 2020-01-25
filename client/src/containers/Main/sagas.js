import { put, takeEvery } from 'redux-saga/effects'
import { actions } from './slice'
import * as UserAPI from '../../api/UserAPI'

function* watchFetchChannel() {
  const channels = yield UserAPI.fetchChannel()
  yield put(actions.dispatchSetChannel(channels))
}

function* watchCreateChannel(action) {
  yield UserAPI.createChannel(action.payload)
  yield put(actions.dispatchFetchChannel())
}

export default function* sagas() {
  yield takeEvery(actions.dispatchFetchChannel.type, watchFetchChannel)
  yield takeEvery(actions.dispatchCreateChannel.type, watchCreateChannel)
}
