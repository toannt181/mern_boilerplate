import { createSelector } from '@reduxjs/toolkit'

const selectUser = state => state.app.user

export const selectUsername = createSelector(
  [selectUser],
  (user) => {
    return user + ' haha'
  }
)