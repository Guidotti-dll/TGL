import styled from 'styled-components/native'

import { colors } from '../../constants/colors'
import { SubTitle } from '../RecentGames/styles'

interface NumberButtonProps {
  color?: string
  selected?: boolean
  size?: number
}
interface ActionButtonProps {
  invert?: boolean
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
  height: ${({ size }) => (size || 59) + 'px'};
  width: ${({ size }) => (size || 59) + 'px'};
  border-radius: 100px;
  background: ${({ selected, color }) => (selected ? color : '#adc0c4')};
  justify-content: center;
  align-items: center;
  margin: 10px 10px 0 0;
  position: relative;
`

export const NumberText = styled.Text<NumberButtonProps>`
  font-size: ${({ size }) => (size || 18) + 'px'};
  font-weight: bold;
  color: ${colors.white};
`

export const Actions = styled.View`
  width: 100%;
  margin-top: 14px;
  margin-bottom: 11px;
  flex-direction: row;
  justify-content: space-between;
`

export const ActionButton = styled.TouchableOpacity<ActionButtonProps>`
  height: 32px;
  border-width: 1px;
  background: ${({ invert }) => (invert ? colors.green : 'transparent')};
  border-color: ${colors.green};
  border-radius: 4px;
  box-shadow: 0 3px 6px #00000008;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 6px;
`

export const ActionText = styled.Text<ActionButtonProps>`
  font-size: 13px;
  font-weight: bold;
  color: ${({ invert }) => (invert ? colors.white : colors.green)};
`
