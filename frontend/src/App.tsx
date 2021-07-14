import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Routes from './routes'
import { persister, store } from './store'
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Routes />
      </PersistGate>
    </Provider>
  )
}

export default App
