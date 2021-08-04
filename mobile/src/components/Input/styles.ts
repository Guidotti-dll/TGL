import { Sae } from 'react-native-textinput-effects'
import styled from 'styled-components/native'

export const InputStyle = styled.View`
  justify-content: flex-start;
  width: 100%;
  height: 70px;
  position: relative;
`
export const TextInput = styled(Sae)`
  padding: 0 26px 0 26px;
  height: 100%;
  font-size: 15px;
  color: #9d9d9d;
  font-weight: bold;
  font-style: italic;
  border-bottom-width: 1px;
  border-bottom-color: #dddddd;
`
export const TextError = styled.Text`
  font-size: 12px;
  margin-top: -20px;
  margin-left: 26px;
  color: red;
`
