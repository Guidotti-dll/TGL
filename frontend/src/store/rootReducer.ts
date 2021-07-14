import { combineReducers } from 'redux'
import Auth from './ducks/Auth'
import Cart from './ducks/Cart'
import Bets from './ducks/Bets'

export default combineReducers({
  Auth,
  Cart,
  Bets,
})
