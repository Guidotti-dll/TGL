import React, { useState, useEffect } from 'react'
import { GameContainer, Number } from './styles'
import { types } from '../../utils/types'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { Button } from '../../styles/Button'
import { Game, Type } from '../../interfaceies/game'
import { useDispatch } from 'react-redux'
import { addBet } from '../../store/ducks/Cart'

const Bet: React.FC = () => {
  const dispatch = useDispatch()
  const [selectedGame, setSelectedGame] = useState<Type>()
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [numbers, setNumbers] = useState<number[]>([])

  useEffect(() => {
    if (selectedGame) {
      const tempNumbers: number[] = []
      for (let index = 1; index <= selectedGame.range; index++) {
        tempNumbers.push(index)
      }
      setNumbers(tempNumbers)
    } else {
      setNumbers([])
    }
  }, [selectedGame])

  const isInArray = (number: number) => {
    return selectedNumbers?.some(numberInArray => numberInArray === number)
  }

  const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const clearGameHandler = () => {
    setSelectedNumbers([])
  }

  const selectGameHandler = (type: Type) => {
    clearGameHandler()
    setSelectedGame(prevState =>
      prevState?.type === type.type ? undefined : type,
    )
  }

  const addNumberHandler = (number: number) => {
    if (isInArray(number)) {
      setSelectedNumbers(prevState =>
        prevState?.filter((numberInArray: number) => numberInArray !== number),
      )
    } else {
      if (
        selectedGame &&
        selectedGame?.['max-number'] > selectedNumbers.length
      ) {
        setSelectedNumbers(prevState => [...prevState, number])
      }
    }
  }

  const completeGameHandler = () => {
    let tempArray = selectedNumbers
    if (selectedGame?.['max-number'] === tempArray.length) {
      tempArray = []
    }
    if (!selectedGame) {
      console.log('Sem game selecionado')
      return
    }
    while (selectedGame?.['max-number'] > tempArray.length) {
      const selectedNumber = getRandomIntInclusive(0, selectedGame?.range)
      const hasInArray = tempArray.some(item => {
        return item === selectedNumber
      })
      if (!hasInArray && selectedNumber !== 0) {
        tempArray.push(selectedNumber)
      }
    }
    console.log(selectedNumbers)
    setSelectedNumbers(tempArray)
  }

  const addToCartHandler = () => {
    if (selectedGame && selectedGame['max-number'] === selectedNumbers.length) {
      const newBet: Game = {
        type: selectedGame!.type,
        color: selectedGame!.color,
        price: selectedGame!.price,
        date: new Date().toISOString(),
        numbers: selectedNumbers.sort((a, b) => a - b),
      }
      dispatch(addBet(newBet))
      clearGameHandler()
    } else {
      console.log('erro')
    }
  }

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
                  selectGameHandler(type)
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
          {numbers.map((number: number) => (
            <li key={number}>
              <Number
                onClick={() => addNumberHandler(number)}
                color={selectedGame?.color}
                className={isInArray(number) ? 'active' : ''}
              >
                {number}
              </Number>
            </li>
          ))}
        </ul>
      </div>
      <div className='actions'>
        <div>
          <button onClick={completeGameHandler}>Complete game</button>
          <button onClick={clearGameHandler}>Clear game</button>
        </div>
        <button className='inverted' onClick={addToCartHandler}>
          <HiOutlineShoppingCart size={25} />
          Add to cart
        </button>
      </div>
    </GameContainer>
  )
}

export default Bet