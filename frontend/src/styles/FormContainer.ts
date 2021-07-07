import styled from "styled-components";
import { colors } from "../constants/colors";

export const FormContainer = styled.section`
  width: 352px;
  color: ${colors.gray};
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 35px;
    font-weight: bold;
    font-style: italic;
  }
  .button {
    width: 100%;
    text-decoration: none;
    font-size: 35px;
    font-weight: bold;
    font-style: italic;
    padding: 30px;
    border: 0;
    background-color: ${colors.white};
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${colors.green};
    cursor: pointer;
    svg {
      width: 24px;
      margin-left: 15px;
    }
  }
  .action {
    color: ${colors.gray};
  }
  .reverse {
    flex-direction: row-reverse;
    svg {
      margin: 0 15px 0 0;
      transform: rotate(180deg);
    }
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 14px;
    background: ${colors.white};
    box-shadow: 0px 3px 25px #00000014;
    border: 1px solid #dddddd;
    margin: 26px 0 15px 0;

    a {
      width: 100%;
      margin: 26.5px 0 0 0;
      text-decoration: none;
      color: #c1c1c1;
      text-align: right;
      padding-right: 27px;
    }
  }
`;
