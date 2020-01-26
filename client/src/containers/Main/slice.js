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
  },
})

export const { actions, reducer } = slice