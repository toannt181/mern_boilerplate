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

function* watchFetchMessage(action) {
  const { channelId } = action.payload
  const messages = yield UserAPI.fetchMessage(channelId)
  yield put(actions.dispatchSetMessage(messages))
}

function* watchSendMessage(action) {
  yield UserAPI.sendMessage(action.payload)
  yield put(actions.dispatchFetchMessage({ channelId: action.payload.channelId }))
}

export default function* sagas() {
  yield takeEvery(actions.dispatchFetchChannel.type, watchFetchChannel)
  yield takeEvery(actions.dispatchCreateChannel.type, watchCreateChannel)
  yield takeEvery(actions.dispatchFetchMessage.type, watchFetchMessage)
  yield takeEvery(actions.dispatchSendMessage.type, watchSendMessage)
}
