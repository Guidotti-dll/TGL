import { TextProps } from 'react-native'
import styled from 'styled-components/native'

import { colors } from '../../constants/colors'

interface TextType extends TextProps {
  color?: string
}

export const Container = styled.View`
  width: 100%;
  align-items: center;
`

export const Title = styled.Text`
  color: ${colors.gray};
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
  margin: 46px 0 26px 0;
`

export const Form = styled.View`
  width: 100%;
  max-width: 306px;
  height: 293px;
  border-radius: 14px;
  background: ${colors.white};
  box-shadow: 0px 3px 25px #0000000f;
  border: 1px solid #dddddd;
  margin: 26px 0 15px 0;
`

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const ForgotText = styled.Text`
  text-align: right;
  color: #c1c1c1;
  font-size: 14px;
  font-style: italic;
  margin-top: 24px;
  margin-bottom: 45px;
  margin: 24px 31px 45px 0;
`

export const ButtonText = styled.Text<TextType>`
  font-size: 30px;
  font-weight: bold;
  font-style: italic;
  color: ${({ color }) => color || colors.gray};
`
