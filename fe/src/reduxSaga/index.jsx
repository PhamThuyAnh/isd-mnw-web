import { all, fork } from 'redux-saga/effects'
import { watchRootSaga } from './Root/RootSaga'
import { watchAuthSaga } from './Auth/AuthSaga'
import { watchProductSaga } from './Product/ProductSaga'

export * from './Root'
export * from './Auth'

export default function* reduxSaga() {
  yield all([
    fork(watchRootSaga),
    fork(watchAuthSaga),
    fork(watchProductSaga),
  ])
}