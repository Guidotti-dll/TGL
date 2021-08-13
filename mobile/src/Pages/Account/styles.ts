import styled from 'styled-components/native'

import { Form as FormBase, Title as TitleBase } from '../SignIn/styles'

export const Container = styled.ScrollView`
  width: 100%;
`
export const Content = styled.View`
  width: 100%;
  align-items: center;
`

export const Form = styled(FormBase)`
  height: 300px;
  align-items: center;
  margin-top: 15px;
`

export const Title = styled(TitleBase)`
  margin: 15px 0;
`
