import { TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

import { colors } from '../../constants/colors'
import { SubTitle } from '../RecentGames/styles'

interface NumberButtonProps extends TouchableOpacityProps {
  color?: string
  selected?: boolean
}

export const Container = styled.View`
  width: 100%;
  background: #f7f7f7;
  position: relative;
`
export const FilterContainer = styled.View`
  background: rgba(247, 247, 247, 0.95);
  padding: 0 20px;
  width: 100%;
  align-items: center;
`
export const DescriptionContainer = styled.View`
  width: 100%;
`
export const DescriptionTitle = styled(SubTitle)`
  margin: 23px 0 5px 0;
`
export const DescriptionText = styled.Text`
  font-size: 14px;
  color: ${colors.gray};
  font-style: italic;
`

export const Line = styled.View`
  width: 36px;
  height: 6px;
  background: #c1c1c1;
  border-radius: 6px;
  margin-top: 3px;
  margin-bottom: 15px;
`

export const NumberButton = styled.TouchableOpacity<NumberButtonProps>`
  height: 59px;
  width: 59px;
  border-radius: 100px;
  background: ${({ selected, color }) => (selected ? color : '#adc0c4')};
  justify-content: center;
  align-items: center;
  margin: 10px 10px 0 0;
`

export const NumberText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
`
