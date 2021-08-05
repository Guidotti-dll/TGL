import { TextProps } from 'react-native'
import styled from 'styled-components/native'

import { colors } from '../../constants/colors'

interface RouteButtonTextProps extends TextProps {
  isFocused: boolean
}

export const BottomTab = styled.View`
  width: 100%;
  flex-direction: row;
  height: 71px;
  align-items: flex-end;
  justify-content: space-between;
  box-shadow: 0 3px 25px #00000017;
  padding: 0 43px 13px 52px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
`

export const Container = styled.View`
  align-items: center;
`

export const NewBetButtonContainer = styled.View`
  height: 92px;
  width: 92px;
  border-radius: 100px;
  background: ${colors.white};
  box-shadow: 0 3px 25px #0000002e;
  justify-content: center;
  align-items: center;
`

export const NewBetButton = styled.TouchableOpacity`
  height: 83px;
  width: 83px;
  border-radius: 100px;
  background: ${colors.green};
  justify-content: center;
  align-items: center;
`

export const RouteButton = styled.TouchableOpacity`
  height: 54px;
  align-items: center;
  justify-content: flex-end;
`

export const RouteButtonText = styled.Text<RouteButtonTextProps>`
  font-size: 14px;
  font-style: italic;
  color: ${({ isFocused }) => (isFocused ? colors.gray : '#C1C1C1')};
  font-weight: ${({ isFocused }) => (isFocused ? 'bold' : 'normal')};
`
export const Line = styled.View<RouteButtonTextProps>`
  display: ${({ isFocused }) => (isFocused ? 'flex' : 'none')};
  background: ${colors.green};
  height: 4px;
  width: 30px;
  border-radius: 6px;
`
