import styled from 'styled-components/native'

import { colors } from '../../constants/colors'

export const Container = styled.View`
  width: 100%;
  background: #f7f7f7;
  position: relative;
`
export const FilterContainer = styled.View`
  background: #f7f7f7;
  padding: 0 20px;
  opacity: 95;
  width: 100%;
  min-height: 136px;
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
