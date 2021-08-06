import { TextProps, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

import { colors } from '../../constants/colors'

interface ButtonProps extends TouchableOpacityProps {
  color?: string
  isSelected?: boolean
}
interface ButtonTextProps extends TextProps {
  color?: string
  isSelected?: boolean
}

export const GameButton = styled.TouchableOpacity<ButtonProps>`
  justify-content: center;
  align-items: center;
  width: 102px;
  height: 30px;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${({ color }) => color || colors.gray};
  background-color: ${({ isSelected, color }) =>
    isSelected ? color : colors.white};
  margin-right: 18px;
`

export const GameButtonText = styled.Text<ButtonTextProps>`
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  color: ${({ color, isSelected }) =>
    isSelected ? colors.white : color || colors.gray};
`
