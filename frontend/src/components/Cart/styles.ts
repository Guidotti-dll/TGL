import styled from 'styled-components'
import { colors } from '../../constants/colors'

export const CartContainer = styled.div`
  width: 317px;
  height: fit-content;
  max-height: 484px;
  background-color: ${colors.white};
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  color: ${colors.gray};
  .content {
    padding: 32px 16px 0 19px;
    h1 {
      font-size: 24px;
      font-style: italic;
      padding: 0 0 35px 0;
    }
    ul {
      max-height: 178px;
      overflow-y: scroll;
    }
    .total {
      font-size: 24px;
      font-style: italic;
      margin: 40px 0 47px 0;
    }
  }
  .buttonContainer {
    background: #f4f4f4;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e2e2e2;
    border-radius: 0 0 10px 10px;
    padding: 27px 0;
    button {
      color: #27c383;
      font-size: 35px;
      font-weight: bold;
      font-style: italic;
      cursor: pointer;
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        margin-left: 16px;
      }
    }
  }
`

export const BetCard = styled.li`
  height: 100%;
  max-height: 86px;
  /* padding: 7px 0; */
  list-style: none;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  button {
    background: transparent;
    border: 0;
    width: 20px;
    height: 24px;
    cursor: pointer;
    color: ${colors.gray};
  }

  .container {
    padding: 7px 0;
    padding-left: 12px;
    margin-left: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: ${colors.gray};
    border-left: 4px solid ${props => (props.color ? props.color : colors.gray)};
    border-radius: 4px;
    strong {
      font-size: 15px;
      font-style: italic;
      margin-bottom: 6px;
    }
    p {
      font-size: 16px;
      strong {
        color: ${props => (props.color ? props.color : colors.gray)};
      }
    }
  }
`
