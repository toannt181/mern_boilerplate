import { createSlice, createSelector } from '@reduxjs/toolkit'
import find from 'lodash/find'
const INITIAL_STATE = {
  channels: [],
  messages: [],
  currentChannel: null,
  currentChannelId: null,
}

const slice = createSlice({
  name: 'user',
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
      state.currentChannelId = action.payload
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

const baseSelector = (state) => state.user

const getUserChannel = createSelector(
  baseSelector,
  (state) => {
    return find(state.channels, { _id: state.currentChannelId })
  }
)

export const selectors = {
  getUserChannel,
}

export const { actions, reducer } = slice
