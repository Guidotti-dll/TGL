import styled from 'styled-components/native'

import { colors } from '../../constants/colors'

interface TextProps {
  color?: string
  size?: number
}
interface LineProps {
  color?: string
}

export const Container = styled.View`
  flex: 1;
  position: relative;
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
`

export const Content = styled.View`
  flex: 1;
  padding: 46px 20px 0 28px;
`
export const Header = styled.View`
  flex-direction: row;
`
export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  font-style: italic;
  color: ${colors.gray};
`
export const BetCard = styled.View`
  flex-direction: row;
  margin-top: 25px;
`

export const Line = styled.View<LineProps>`
  min-height: 79px;
  width: 6px;
  border-radius: 100px;
  background-color: ${({ color }) => color || colors.gray};
`
export const Details = styled.View`
  justify-content: center;
  margin-left: 15px;
  width: 196px;
`

export const LineView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0;
`

export const BoldText = styled(Title)<TextProps>`
  font-size: ${({ size }) => (size || 12) + 'px'};
  color: ${({ color }) => color || '#868686'};
`
export const SlimText = styled.Text`
  font-size: 12px;
  color: #868686;
`

export const TotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 45px;
`

export const SaveContainer = styled.View`
  height: 94px;
  width: 265px;
  background: #ebebeb;
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
  justify-content: center;
  align-items: center;
`
