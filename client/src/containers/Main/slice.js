import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  channels: [],
  messages: [],
  currentChannel: null,
}

const slice = createSlice({
  name: 'main',
  initialState: INITIAL_STATE,
  reducers: {
    dispatchSetChannel(state, action) {
      state.channels = action.payload
    },
    dispatchAddMessage(state, action) {
      state.messages.push(action.payload)
    },
    dispatchSetMessage(state, action) {
      state.messages = action.payload
    },
    dispatchSelectChannel(state, action) {
      state.currentChannel = action.payload
    },
    dispatchFetchChannel() { },
    dispatchCreateChannel() { },
    dispatchFetchMessage() { },
    dispatchSendMessage() { },
    dispatchDeleteChannel() { },
    dispatchRequestJoinRoom() { },
    dispatchRequestLeaveRoom() { },
  },
})

export const { actions, reducer } = slice