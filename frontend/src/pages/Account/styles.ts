import styled from 'styled-components'
import { colors } from '../../constants/colors'
import { Container } from '../../styles/DashContainer'

export const AccountContainer = styled(Container)`
  width: 100%;
  display: flex;
  justify-content: center;
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    h1 {
      color: ${colors.gray};
    }
    .infos {
      margin-top: 10px;
      border-radius: 14px;
      background: ${colors.white};
      box-shadow: 0px 3px 25px #00000014;
      border: 1px solid #dddddd;
      button {
        width: 100%;
        height: 75px;
        border: 0;
        background: transparent;
        color: ${colors.green};
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
`
