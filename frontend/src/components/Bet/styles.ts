import styled from 'styled-components'
import { colors } from '../../constants/colors'

export const GameContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  color: ${colors.gray};

  h1 {
    font-size: 24px;
    font-style: italic;
    span {
      font-weight: normal;
    }
  }

  strong {
    font-size: 17px;
  }

  ul {
    list-style: none;
  }
  .filter {
    margin: 33px 0 28px 0;
    ul {
      margin-top: 20px;
      display: flex;
    }
  }

  .description {
    font-size: 17px;
    font-style: italic;
  }

  .numbers {
    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        margin: 20px 12px 0 0;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 44px;
    button {
      height: 52px;
      border: 1px solid #27c383;
      background: transparent;
      color: #27c383;
      border-radius: 10px;
      padding: 17px 26px 16px 25px;
      font-size: 16px;
      display: flex;
      align-items: center;
      cursor: pointer;
      :hover,
      :active,
      &.inverted {
        background: #27c383;
        color: ${colors.white};
      }
      &.inverted:hover {
        background: transparent;
        color: #27c383;
      }
    }
    div {
      display: flex;
      button:last-child {
        margin-left: 25px;
      }
    }
  }
`
export const Number = styled.button`
  width: 63px;
  height: 65px;
  border: 0;
  border-radius: 50%;
  background: #adc0c4;
  font-size: 20px;
  font-weight: bold;
  color: ${colors.white};

  cursor: pointer;

  &:hover,
  :active,
  &.active {
    background: ${({ color }) => color};
  }
`
