import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  user: null,
  warningData: { visible: false },
  notifiable: false,
  appLoadingStack: 0,
}

const slice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    dispatchSetUser(state, action) {
      state.user = action.payload
    },
    dispatchFetchUser() { },
    dispatchCreateUser() { },
    dispatchEmitConnectedUser() { },
    dispatchLogin() { },
    dispatchVerifyEmail() { },
    dispatchWarningModal(state, action) {
      state.warningData = action.payload
    },
    dispatchSetNotificationPermision(state, action) {
      state.notifiable = action.payload
    },
  },
})

export const { actions, reducer } = slice
