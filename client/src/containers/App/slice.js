import { createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN } from '../../configs/constants'

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem(ACCESS_TOKEN)) || null,
  warningData: { visible: false },
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
    dispatchWarningModal(state, action) {
      state.warningData = action.payload
    },
  },
})

export const { actions, reducer } = slice