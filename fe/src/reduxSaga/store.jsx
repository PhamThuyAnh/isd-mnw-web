import { AnyAction, combineReducers, configureStore, MiddlewareArray } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { rootReducer } from './Root'
import { authReducer } from './Auth'
import reduxSaga from '.'
import { productReducer } from './Product'

const sagaMiddleware = createSagaMiddleware()

const reducers = {
  root: rootReducer,
  auth: authReducer,
  product: productReducer,
}

const logger = createLogger({
  // ...options
})

const rootsReducer = combineReducers(reducers)

const resettableRootReducer = (state, action) => {
  if (action.type === 'rootRedux/logout') {
    return rootsReducer(undefined, action)
  }
  return rootsReducer(state, action)
}

export const store = configureStore({
  reducer: resettableRootReducer,
  middleware: new MiddlewareArray().concat(sagaMiddleware, logger)
})

sagaMiddleware.run(reduxSaga)
