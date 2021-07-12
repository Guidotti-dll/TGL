import styled from 'styled-components'
import { colors } from '../constants/colors'

export const Button = styled.button`
  width: 113px;
  height: 34px;
  background: #ffffff;
  border: 2px solid ${props => (props.color ? props.color : colors.gray)};
  border-radius: 100px;
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  color: ${props => (props.color ? props.color : colors.gray)};
  cursor: pointer;
  margin-right: 20px;

  &.active,
  :hover,
  :active {
    color: ${colors.white};
    background-color: ${props => (props.color ? props.color : colors.gray)};
  }
`
