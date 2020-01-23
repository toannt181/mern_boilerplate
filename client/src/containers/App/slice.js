import { createSlice } from '@reduxjs/toolkit'
const INITIAL_STATE = { user: null }

const slice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    dispatchSetUser(state, action) {
      state.user = action.payload
    },
    fetchUser() { },
    dispatchCreateUser() { },
  },
})

export const { actions, reducer } = slice