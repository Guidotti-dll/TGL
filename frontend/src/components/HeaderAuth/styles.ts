import styled from 'styled-components'
import { colors } from '../../constants/colors'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 0;
    color: ${colors.gray};
    font-style: italic;
    font-weight: bold;
    text-align: center;

    &:nth-child(1) {
      font-size: 4.063rem;
      width: 15.25rem;
      margin-bottom: 30px;
    }
    &:nth-child(2) {
      font-size: 1.375rem;
      width: 9rem;
      height: 39px;
      color: ${colors.white};
      background-color: ${colors.green};
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
    }
    &:nth-child(3) {
      font-size: 5.188rem;
    }
  }
`
