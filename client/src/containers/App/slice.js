import { createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN } from '../../configs/constants'

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem(ACCESS_TOKEN)) || null,
}

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