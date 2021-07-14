import styled from 'styled-components'
import { colors } from '../../constants/colors'

import { Container } from '../../styles/DashContainer'

export const GamesContainer = styled(Container)`
  ul {
    margin-top: 38px;
  }
  .gamesEmpty {
    margin-top: 15px;
    color: ${colors.gray};
    display: flex;
    flex-direction: column;
    strong {
      font-size: 20px;
      font-style: italic;
    }
    span {
      margin-top: 5px;
      font-size: 17px;
    }
  }
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    h1 {
      font-size: 24px;
      font-weight: bold;
      font-style: italic;
      color: ${colors.gray};
    }
    .filter {
      margin-left: 45px;
      span {
        color: ${colors.gray};
        font-size: 17px;
        font-style: italic;
        margin-right: 15px;
      }
    }
  }

  a {
    font-size: 24px;
    font-weight: bold;
    font-style: italic;
    color: ${colors.green};
    text-decoration: none;
    display: flex;
    align-items: center;
    svg {
      margin-left: 11px;
    }
  }
`

export const BetCard = styled.li`
  height: 94px;
  padding: 7px 0;
  position: relative;
  list-style: none;
  margin-bottom: 30px;
  .container {
    margin-left: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: ${colors.gray};
    strong {
      font-size: 20px;
      font-style: italic;
    }
    p {
      font-size: 17px;
    }
    .type {
      color: ${props => (props.color ? props.color : colors.gray)};
    }
  }

  &::before {
    position: absolute;
    bottom: 0;
    content: '';
    height: 100px;
    width: 6px;
    border-radius: 100px;
    background: ${props => (props.color ? props.color : colors.gray)};
  }
`
