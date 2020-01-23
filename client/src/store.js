import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { reducer as app } from './containers/App/slice'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: { app },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(sagas)
