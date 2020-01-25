import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  channels: [],
}

const slice = createSlice({
  name: 'main',
  initialState: INITIAL_STATE,
  reducers: {
    dispatchSetChannel(state, action) {
      state.channels = action.payload
    },
    dispatchFetchChannel() { },
    dispatchCreateChannel() { },
  },
})

export const { actions, reducer } = slice