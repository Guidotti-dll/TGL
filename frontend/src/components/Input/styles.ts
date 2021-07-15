import styled from 'styled-components'

export const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 2px solid #ebebeb;
  input {
    padding: 34px 30px 26px 30px;
    width: 100%;
    height: 80%;
    font-size: 17px;
    color: #9d9d9d;
    font-weight: bold;
    font-style: italic;
    background: transparent;
    color: #9d9d9d;
  }

  span {
    font-size: 13px;
    margin-bottom: 5px;
    margin-left: 30px;
    color: red;
  }

  &::placeholder {
    color: #9d9d9d;
  }
`
