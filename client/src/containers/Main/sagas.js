import { put, takeEvery } from 'redux-saga/effects'
import { actions } from './slice'
import { actions as appActions } from '../App/slice'
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
  try {
    const { channelId } = action.payload
    const messages = yield UserAPI.fetchMessage(channelId)
    yield put(actions.dispatchSetMessage(messages))
  } catch (e) {
    yield put(appActions.dispatchWarningModal({ message: 'Meet errors when fetching messages', visible: true }))
  }
}

function* watchSendMessage(action) {
  const { user, channelId } = action.payload
  const message = yield UserAPI.sendMessage(action.payload)
  const newMessage = { ...message, user }
  yield UserAPI.emitNewMessage({ channelId, message: newMessage })
  yield put(actions.dispatchAddMessage(newMessage))
}

function* watchDeleteChannel(action) {
  yield UserAPI.deleteChannel(action.payload)
  yield put(actions.dispatchFetchChannel())
}

function* watchRequestJoinRoom(action) {
  yield UserAPI.requestJoinRoom(action.payload)
}

function* watchRequestLeaveRoom(action) {
  yield UserAPI.requestLeaveRoom(action.payload)
}

export default function* sagas() {
  yield takeEvery(actions.dispatchFetchChannel.type, watchFetchChannel)
  yield takeEvery(actions.dispatchCreateChannel.type, watchCreateChannel)
  yield takeEvery(actions.dispatchFetchMessage.type, watchFetchMessage)
  yield takeEvery(actions.dispatchSendMessage.type, watchSendMessage)
  yield takeEvery(actions.dispatchDeleteChannel.type, watchDeleteChannel)
  yield takeEvery(actions.dispatchRequestJoinRoom.type, watchRequestJoinRoom)
  yield takeEvery(actions.dispatchRequestLeaveRoom.type, watchRequestLeaveRoom)
}
