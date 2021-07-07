import { InputStyle } from "./styles";
const Input = ({ ...atributes }) => {
  return (
    <InputStyle {...atributes}>
      <input {...atributes} />
      {atributes.error && <span>{atributes.error}</span>}
    </InputStyle>
  );
};

export default Input;
