import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { routerReducer } from 'react-router-redux'
import { reducer as app } from './containers/App/slice'
import { reducer as main } from './containers/Main/slice'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    app,
    main,
    routing: routerReducer,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(sagas)
