import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../../store'
import { CartState, removeBet } from '../../store/ducks/Cart'
import { formatMoney } from '../../utils/formatValue'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
import { BetCard, CartContainer } from './styles'
import { saveBetsRequest } from '../../store/ducks/Bets'

const Cart: React.FC = () => {
  const { totalBetValue, bets } = useSelector<AppStore, CartState>(
    state => state.Cart,
  )
  const dispatch = useDispatch()

  const deleteBetHandler = (index: number) => {
    dispatch(removeBet(index))
  }
  const saveBetHandler = () => {
    dispatch(saveBetsRequest(bets))
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
