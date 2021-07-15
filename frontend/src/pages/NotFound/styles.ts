import styled from 'styled-components'
import { colors } from '../../constants/colors'
import { AuthContainer } from '../../styles/AuthContainer'

export const NotfoundContainer = styled(AuthContainer)`
  .notFound {
    text-align: center;
    h1 {
      font-size: 78px;
      color: ${colors.gray};
    }
  }
`
