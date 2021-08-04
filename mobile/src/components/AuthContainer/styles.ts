import styled from 'styled-components/native'

import { colors } from '../../constants/colors'

export const ScrollView = styled.ScrollView`
  padding: 0 35px;
`
export const Logo = styled.View`
  align-items: center;
  margin-top: 75px;
`

export const LogoText = styled.Text`
  font-size: 44px;
  color: ${colors.gray};
  font-weight: bold;
`
export const LogoLine = styled.View`
  width: 107px;
  height: 7px;
  background: ${colors.green};
  border-radius: 6px;
  margin-top: 4px;
`

export const Footer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 27px 0;
`

export const FooterText = styled.Text`
  font-size: 15px;
  margin-top: 128px;
  color: ${colors.gray};
`
