import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../../store'
import { CartState, removeBet } from '../../store/ducks/Cart'
import { formatMoney } from '../../utils/formatValue'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
import { BetCard, CartContainer } from './styles'
import { BetState, saveBetsRequest } from '../../store/ducks/Bets'
import { useHistory } from 'react-router-dom'
import { types } from '../../utils/types'

const Cart: React.FC = () => {
  const { totalBetValue, bets } = useSelector<AppStore, CartState>(
    state => state.Cart,
  )
  const { error } = useSelector<AppStore, BetState>(state => state.Bets)
  const dispatch = useDispatch()
  const { push } = useHistory()

  const deleteBetHandler = (index: number) => {
    dispatch(removeBet(index))
  }
  const saveBetHandler = () => {
    let minValue = 0
    bets.forEach(element => {
      const tempType = types.find(type => type.type === element.type)
      if (tempType!['min-cart-value'] > minValue) {
        minValue = tempType!['min-cart-value']
      }
    })
    if (minValue > totalBetValue) {
      console.log(`O valor minimo deve ser ${formatMoney(minValue)}`)
      return
    }
    dispatch(saveBetsRequest(bets))

    if (!error) {
      push('recent-games')
    }
  }

  return (
    <CartContainer>
      <div className='content'>
        <h1>Cart</h1>
        <ul>
          {bets.map((bet, index) => (
            <BetCard key={index} color={bet.color}>
              <button onClick={deleteBetHandler.bind(null, index)}>
                <BsTrash size={20} />
              </button>
              <div className='container'>
                <strong>{bet.numbers.sort((a, b) => a - b).join(', ')}</strong>
                <p>
                  <strong>{bet.type}</strong>{' '}
                  <span>{formatMoney(bet.price)}</span>
                </p>
              </div>
            </BetCard>
          ))}
        </ul>
        {totalBetValue > 0 ? (
          <>
            <p className='total'>
              <strong>CART</strong> <span>TOTAL</span> :{' '}
              {formatMoney(totalBetValue)}
            </p>
          </>
        ) : (
          <p className='total'>Cart Empty </p>
        )}
      </div>

      {totalBetValue > 0 && (
        <div className='buttonContainer'>
          <button onClick={saveBetHandler}>
            Save <HiOutlineArrowRight />
          </button>
        </div>
      )}
    </CartContainer>
  )
}

export default Cart
