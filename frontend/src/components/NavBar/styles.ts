import styled from 'styled-components'
import { colors } from '../../constants/colors'

export const Nav = styled.header`
  height: 75.5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ebebeb;
  color: ${colors.gray};
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  padding: 0 199px 0 130px;

  a {
    text-decoration: none;
    color: ${colors.gray};
  }

  .disable {
    display: none;
  }

  .logoContainer {
    display: flex;
    align-items: center;

    h1 {
      font-size: 44px;
      display: flex;
      justify-content: center;
      position: relative;

      &::before {
        position: absolute;
        bottom: -16px;
        content: '';
        width: 107px;
        height: 7px;
        background: ${colors.green};
        border-radius: 6px;
      }
    }

    .home {
      margin-left: 75px;
    }
  }

  nav {
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
      li {
        button {
          height: 100%;
          background: transparent;
          border: none;
          color: ${colors.gray};
          cursor: pointer;
          font-size: 20px;
          font-weight: bold;
          font-style: italic;
          display: flex;
          align-items: center;
          margin-left: 40px;
          svg {
            margin-left: 10px;
          }
        }
      }
    }
  }
`
