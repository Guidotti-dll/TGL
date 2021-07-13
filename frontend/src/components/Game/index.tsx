import React, { useState, useEffect } from 'react'
import { GameContainer, Number } from './styles'
import { types } from '../../utils/types'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { Button } from '../../styles/Button'
import { Type } from '../../interfaceies/game'

const Game: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Type>()
  // const [selectedNumbers, setSelectedNumbers] = useState<number[]>()
  const [numbers, setNumbers] = useState<number[]>()

  useEffect(() => {
    if (selectedGame) {
      const tempNumbers: number[] = []
      for (let index = 1; index <= selectedGame.range; index++) {
        tempNumbers.push(index)
      }
      setNumbers(tempNumbers)
    } else {
      setNumbers(undefined)
    }
  }, [selectedGame])

  return (
    <GameContainer>
      <h1>
        New bet <span>for {selectedGame?.type.toUpperCase() || 'TLG'}</span>
      </h1>
      <div className='filter'>
        <strong>Chouse a game</strong>
        <ul>
          {types.map(type => (
            <li key={type.color}>
              <Button
                onClick={() => {
                  setSelectedGame(prevState =>
                    prevState?.type === type.type ? undefined : type,
                  )
                }}
                color={type.color}
                className={selectedGame?.type === type.type ? 'active' : ''}
              >
                {type.type}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className='description'>
        <strong>Fill your bet</strong>
        <p>{selectedGame?.description || 'Choose a game'}</p>
      </div>
      <div className='numbers'>
        <ul>
          {numbers?.map(number => (
            <li key={number}>
              <Number
                color={selectedGame?.color}
                className={number === 12 ? 'active' : ''}
              >
                {number}
              </Number>
            </li>
          ))}
        </ul>
      </div>
      <div className='actions'>
        <div>
          <button>Complete game</button>
          <button>Clear game</button>
        </div>
        <button className='inverted'>
          <HiOutlineShoppingCart size={25} />
          Add to cart
        </button>
      </div>
    </GameContainer>
  )
}

export default Game
