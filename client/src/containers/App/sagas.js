import { put, takeEvery } from 'redux-saga/effects'
import { actions } from './slice'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* incrementAsync() {
  yield delay(1000)
  yield put(actions.setUser('fetched user'))
}

export default function* sagas() {
  yield takeEvery(actions.fetchUser.type, incrementAsync)
}
