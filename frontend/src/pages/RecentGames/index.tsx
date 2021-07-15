import React, { useState, useEffect } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Header, BetCard, GamesContainer } from './styles'
import { Button } from '../../styles/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../../store'
import { formatDate, formatMoney } from '../../utils/formatValue'
import { BetState, resetSuccess } from '../../store/ducks/Bets'
import { useTypes } from '../../hooks/useTypes'

const RecentGames: React.FC = () => {
  const { myNets } = useSelector<AppStore, BetState>(state => state.Bets)
  const [filteredGames, setFilteredGames] = useState(myNets)
  const dispatch = useDispatch()
  const { types } = useTypes()
  const [filter, setFilter] = useState('')
  useEffect(() => {
    if (filter) {
      setFilteredGames(myNets.filter(game => game.type === filter))
    } else {
      setFilteredGames(myNets)
    }
  }, [filter])

  useEffect(() => {
    dispatch(resetSuccess())
  }, [])

  return (
    <GamesContainer>
      <Header>
        <div>
          <h1>Recent Games</h1>
          <div className='filter'>
            <span>Filters</span>
            {types.length === 0 && <span>Erro ao carregar filtro</span>}
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
      {myNets.length === 0 && (
        <div className='gamesEmpty'>
          <strong>Você não possui jogos cadastrados</strong>
          <span>Aposte um pouco, só não ganha quem não joga!!</span>
        </div>
      )}
      {filter && filteredGames.length === 0 && myNets.length > 0 && (
        <div className='gamesEmpty'>
          <span>Você não possui jogos do tipo {filter} cadastrados</span>
        </div>
      )}
      <ul>
        {filteredGames.map((game, index) => (
          <BetCard color={game.color} key={index}>
            <div className='container'>
              <strong>{game.numbers.sort((a, b) => a - b).join(', ')}</strong>
              <p>
                {formatDate(game.date)} - ({formatMoney(game.price)})
              </p>
              <strong className='type'>{game.type}</strong>
            </div>
          </BetCard>
        ))}
      </ul>
    </GamesContainer>
  )
}

export default RecentGames
