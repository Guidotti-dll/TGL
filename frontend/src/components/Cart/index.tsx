import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '../../store'
import { CartState } from '../../store/ducks/Cart'
import { formatMoney } from '../../utils/formatValue'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
import { BetCard, CartContainer } from './styles'

const Cart: React.FC = () => {
  const { totalBetValue, bets } = useSelector<AppStore, CartState>(
    state => state.Cart,
  )

  const deleteBetHandler = (index: number) => {
    console.log(index)
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
        {totalBetValue && totalBetValue > 0 ? (
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

      {totalBetValue && totalBetValue > 0 && (
        <div className='buttonContainer'>
          <button>
            Save <HiOutlineArrowRight />
          </button>
        </div>
      )}
    </CartContainer>
  )
}

export default Cart
