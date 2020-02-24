import { createSlice, createSelector } from '@reduxjs/toolkit'
import find from 'lodash/find'
const INITIAL_STATE = {
  channels: [],
  members: [],
  messages: [],
  currentChannelId: null,
  viewUserId: null,
  guestUserInfo: {},
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
    dispatchPostUserInfo() { },
    dispatchRequestAcceptInvitedChannel() { },
    dispatchInviteMember() { },
    dispatchUpdateChannel(state, action) {
      state.channels.forEach(channel => {
        if (channel._id === action.payload._id) {
          channel = [...channel, ...action.payload]
        }
      })
    },
    dispatchFetchMemberList() { },
    dispatchSetMemberList(state, action) {
      state.members = action.payload
    },
    dispatchUpdateMemberStatus(state, action) {
      state.members.forEach(member => {
        if (member._id === action.payload.userId) {
          member.status = action.payload.status
        }
      })
    },
    dispatchLastReadMessage() { },
    dispatchUpdateSingleChannel(state, action) {
      const { channelId, ...rest } = action.payload
      state.channels = state.channels.map(channel => {
        if (channel._id === channelId) {
          return { ...channel, ...rest }
        }
        return channel
      })
    },
    dispatchNewUnreadMessage(state, action) {
      const { channelId, unreadMessage } = action.payload
      state.channels = state.channels.map(channel => {
        if (channel._id === channelId) {
          return { ...channel, unreadMessageNumber: channel.unreadMessageNumber + unreadMessage }
        }
        return channel
      })
    },
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
