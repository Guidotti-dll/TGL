import { createStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import { AuthState } from './ducks/Auth'

import rootSaga from './rootSaga'
import rootReducer from './rootReducer'
import { CartState } from './ducks/Cart'
import { BetState } from './ducks/Bets'

export interface AppStore {
  Auth: AuthState
  Cart: CartState
  Bets: BetState
}

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'TGL-SECRET-KEY-HASH',
      onError: () => {
        sessionStorage.clear()
      },
    }),
  ],
}

const reducerPersist = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const store: Store<AppStore> = createStore(
  reducerPersist,
  applyMiddleware(...middleware),
)
const persister = persistStore(store)

sagaMiddleware.run(rootSaga)

export { persister, store }
