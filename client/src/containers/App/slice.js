import { createSlice } from '@reduxjs/toolkit'
const INITIAL_STATE = { user: null }

const slice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    fetchUser() { },
  },
})

export const { actions, reducer } = slice