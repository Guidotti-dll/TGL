import styled from "styled-components";

export const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 2px solid #ebebeb;
  padding: 34px 0 26px 30px;
  input {
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
    margin-top: 5px;
    color: red;
  }

  &::placeholder {
    color: #9d9d9d;
  }
`;
