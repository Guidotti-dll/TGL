import styled from 'styled-components/native'

import { colors } from '../../constants/colors'

interface BetsProps {
  color?: string
}

export const Container = styled.View`
  width: 100%;
  background: #f7f7f7;
  position: relative;
  flex: 1;
`
export const FilterContainer = styled.View`
  background: #f7f7f7;
  padding: 0 20px;
  opacity: 95;
  width: 100%;
  min-height: 136px;
  padding-bottom: 2px;
`

export const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
  font-style: italic;
  color: ${colors.gray};
  margin-top: 26px;
`

export const SubTitle = styled.Text`
  font-size: 17px;
  font-style: italic;
  color: ${colors.gray};
  margin: 15px 0;
`

export const BetContainer = styled.View`
  height: 79px;
  width: 100%;
  margin-top: 25px;
  padding: 0 20px 0 20px;
  flex-direction: row;
`

export const Line = styled.View<BetsProps>`
  height: 100%;
  width: 6px;
  background: ${({ color }) => color || colors.gray};
  border-radius: 100px;
  margin-right: 15px;
`

export const Details = styled.View`
  justify-content: space-between;
  padding: 4px 0;
`

export const Numbers = styled.Text`
  font-size: 12px;
  color: ${colors.gray};
  font-weight: bold;
  font-style: italic;
`

export const DetailsText = styled(Numbers)`
  font-weight: normal;
  font-style: normal;
`
export const TypeText = styled.Text<BetsProps>`
  color: ${({ color }) => color || colors.gray};
`

export const GamesEmpty = styled.View`
  margin-top: 10px;
  padding: 0 20px;
`
export const GamesEmptyTitle = styled.Text`
  font-size: 15px;
  font-style: italic;
  color: ${colors.gray};
  font-weight: bold;
`
export const GamesEmptySubTitle = styled.Text`
  font-size: 12px;
  font-style: italic;
  color: ${colors.gray};
  margin-top: 5px;
`
