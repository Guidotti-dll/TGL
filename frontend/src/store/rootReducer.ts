import { combineReducers } from 'redux'
import Auth from './ducks/Auth'
import Cart from './ducks/Cart'

export default combineReducers({
  Auth,
  Cart,
})
