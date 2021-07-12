import React, { useState, useEffect } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Header, Game, GamesContainer } from './styles'
import { types } from '../../utils/types'
import { Button } from '../../styles/Button'
import { useSelector } from 'react-redux'
import { AppStore } from '../../store'
import { AuthState } from '../../store/ducks/Auth'

const RecentGames: React.FC = () => {
  const { user } = useSelector<AppStore, AuthState>(state => state.Auth)
  const [filteredGames, setFilteredGames] = useState(user.recentGames)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (filter) {
      setFilteredGames(user.recentGames.filter(game => game.type === filter))
    } else {
      setFilteredGames(user.recentGames)
    }
  }, [filter])

  return (
    <GamesContainer>
      <Header>
        <div>
          <h1>Recent Games</h1>
          <div className='filter'>
            <span>Filters</span>
            {types.map(type => (
              <Button
                onClick={() => {
                  setFilter(prevstate =>
                    prevstate === type.type ? '' : type.type,
                  )
                }}
                color={type.color}
                key={type.color}
                className={filter === type.type ? 'active' : ''}
              >
                {type.type}
              </Button>
            ))}
          </div>
        </div>
        <Link to='/new-bet'>
          New Bet <HiOutlineArrowRight />
        </Link>
      </Header>
      <ul>
        {filteredGames.map((game, index) => (
          <Game color={game.color} key={index}>
            <div className='container'>
              <strong>{game.numbers.sort((a, b) => a - b).join(', ')}</strong>
              <p>
                {game.data} - ({game.price})
              </p>
              <strong className='type'>{game.type}</strong>
            </div>
          </Game>
        ))}
      </ul>
    </GamesContainer>
  )
}

export default RecentGames
