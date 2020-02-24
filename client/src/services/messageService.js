import { put, takeEvery } from 'redux-saga/effects'
import { actions as userActions } from '../slices/userSlice'
import { actions as appActions } from '../slices/appSlice'
import * as UserAPI from '../api/UserAPI'
import { STATUS } from 'configs/constants'

function* watchFetchChannel() {
  const channels = yield UserAPI.fetchChannel()
  yield put(userActions.dispatchSetChannel(channels))
}

function* watchCreateChannel(action) {
  yield UserAPI.createChannel(action.payload)
  yield put(userActions.dispatchFetchChannel())
}

function* watchFetchMessage(action) {
  try {
    const { channelId } = action.payload
    const messages = yield UserAPI.fetchMessage(channelId)
    yield put(userActions.dispatchSetMessage(messages))
  } catch (e) {
    yield put(appActions.dispatchWarningModal({ message: 'Meet errors when fetching messages', visible: true }))
  }
}

function* watchSendMessage(action) {
  const { user, channelId } = action.payload
  const message = yield UserAPI.sendMessage(action.payload)
  const newMessage = { ...message, user }
  yield UserAPI.emitNewMessage({ channelId, message: newMessage })
  yield put(userActions.dispatchAddMessage(newMessage))
}

function* watchDeleteChannel(action) {
  yield UserAPI.deleteChannel(action.payload)
  yield put(userActions.dispatchFetchChannel())
}

function* watchRequestJoinRoom(action) {
  yield UserAPI.requestJoinRoom(action.payload)
}

function* watchRequestLeaveRoom(action) {
  yield UserAPI.requestLeaveRoom(action.payload)
}

function* watchPostUserInfo(action) {
  try {
    yield UserAPI.updateProfile(action.payload)
    window.location.reload()
  } catch { }
}

function* watchRequestAcceptInvitedChannel(action) {
  try {
    yield UserAPI.acceptInvitedChannel(action.payload)
    yield put(userActions.dispatchUpdateSingleChannel({ channelId: action.payload, status: STATUS.JOINED }))
  } catch { }
}

function* watchdInviteMember(action) {
  try {
    yield UserAPI.inviteMember(action.payload)
  } catch { }
}

function* watchFetchMemberList() {
  try {
    const members = yield UserAPI.fetchMemberList()
    yield put(userActions.dispatchSetMemberList(members))
  } catch { }
}

function* watchUpdateLastReadMessage(action) {
  try {
    const { channelId, lastReadMessageId } = action.payload
    yield UserAPI.updateLastReadMessage(action.payload)
    yield put(userActions.dispatchUpdateSingleChannel({
      channelId,
      lastReadMessageId,
      unreadMessageNumber: 0,
    }))
  } catch { }
}

function* watchFetchViewUserInfo(action) {
  try {
    const user = yield UserAPI.viewUserInfo(action.payload)
    yield put(appActions.dispatchUpdateGuestUserInfo(user))
  } catch { }
}

export default function* sagas() {
  yield takeEvery(userActions.dispatchFetchChannel.type, watchFetchChannel)
  yield takeEvery(userActions.dispatchCreateChannel.type, watchCreateChannel)
  yield takeEvery(userActions.dispatchFetchMessage.type, watchFetchMessage)
  yield takeEvery(userActions.dispatchSendMessage.type, watchSendMessage)
  yield takeEvery(userActions.dispatchDeleteChannel.type, watchDeleteChannel)
  yield takeEvery(userActions.dispatchRequestJoinRoom.type, watchRequestJoinRoom)
  yield takeEvery(userActions.dispatchRequestLeaveRoom.type, watchRequestLeaveRoom)
  yield takeEvery(userActions.dispatchPostUserInfo.type, watchPostUserInfo)
  yield takeEvery(userActions.dispatchRequestAcceptInvitedChannel.type, watchRequestAcceptInvitedChannel)
  yield takeEvery(userActions.dispatchInviteMember.type, watchdInviteMember)
  yield takeEvery(userActions.dispatchFetchMemberList.type, watchFetchMemberList)
  yield takeEvery(userActions.dispatchLastReadMessage.type, watchUpdateLastReadMessage)
  yield takeEvery(appActions.dispatchFetchViewUserInfo.type, watchFetchViewUserInfo)
}
