import styled from 'styled-components/native'

import { colors } from '../../constants/colors'
import {
  Logo as LogoBase,
  LogoLine as LogoLineBase,
  LogoText as LogoTextBase,
} from '../AuthContainer/styles'

export const HeaderContainer = styled.View`
  height: 79px;
  width: 100%;
  background: ${colors.white};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 3px 21px #00000008;
`
export const Logo = styled(LogoBase)`
  margin-top: 0;
`

export const LogoText = styled(LogoTextBase)`
  font-size: 30px;
`
export const LogoLine = styled(LogoLineBase)`
  width: 75px;
  height: 6px;
  margin-top: 3px;
`

export const IconsContainer = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
`
