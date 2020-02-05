import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { routerReducer } from 'react-router-redux'
import { reducer as app } from './slices/appSlice'
import { reducer as user } from './slices/userSlice'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    app,
    user,
    routing: routerReducer,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(sagas)
