import { createStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { AuthState } from './ducks/Auth'

import rootSaga from './rootSaga'
import rootReducer from './rootReducer'

export interface AppStore {
  auth: AuthState
}

const sagaMiddleware = createSagaMiddleware()

const store: Store<AppStore> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(rootSaga)

export default store
