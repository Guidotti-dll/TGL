import React, { useState, useEffect } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Header, BetCard, GamesContainer } from './styles'
import { Button } from '../../styles/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../../store'
import { formatDate, formatMoney } from '../../utils/formatValue'
import { BetState, getBetsRequest, resetSuccess } from '../../store/ducks/Bets'
import { useTypes } from '../../hooks/useTypes'

const RecentGames: React.FC = () => {
  const { myBets, actualPage } = useSelector<AppStore, BetState>(
    state => state.Bets,
  )
  const [filteredGames, setFilteredGames] = useState(myBets)
  const dispatch = useDispatch()
  const { types } = useTypes()
  const [filter, setFilter] = useState('')
  useEffect(() => {
    if (filter) {
      setFilteredGames(myBets.filter(game => game.type === filter))
    } else {
      setFilteredGames(myBets)
    }
  }, [filter, myBets])

  useEffect(() => {
    dispatch(resetSuccess())
    if (myBets.length === 0) {
      dispatch(getBetsRequest(actualPage, myBets.length))
    }
  }, [])

  const handleChangePage = () => {
    dispatch(getBetsRequest(actualPage, myBets.length))
  }

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
                  setFilter(prevState =>
                    prevState === type.type ? '' : type.type,
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
      {myBets.length === 0 && (
        <div className='gamesEmpty'>
          <strong>Você não possui jogos cadastrados</strong>
          <span>Aposte um pouco, só não ganha quem não joga!!</span>
        </div>
      )}
      {filter && filteredGames.length === 0 && myBets.length > 0 && (
        <div className='gamesEmpty'>
          <span>Você não possui jogos do tipo {filter} cadastrados</span>
        </div>
      )}
      <ul id='scrollableDiv'>
        <InfiniteScroll
          dataLength={filteredGames.length}
          next={handleChangePage}
          hasMore={true}
          loader={<p></p>}
          scrollableTarget='scrollableDiv'
        >
          {filteredGames.map((game, index) => (
            <BetCard color={game.color} key={index}>
              <div className='container'>
                <strong>{game.numbers}</strong>
                <p>
                  {formatDate(game.date)} - ({formatMoney(game.price)})
                </p>
                <strong className='type'>{game.type}</strong>
              </div>
            </BetCard>
          ))}
        </InfiniteScroll>
      </ul>
    </GamesContainer>
  )
}

export default RecentGames
