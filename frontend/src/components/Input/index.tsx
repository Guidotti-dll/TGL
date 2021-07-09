import React, { InputHTMLAttributes, RefObject, forwardRef } from 'react'
import { InputStyle } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  error?: string
  ref: RefObject<HTMLInputElement>
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { ...atributes },
  ref,
) => {
  return (
    <InputStyle>
      <input {...atributes} ref={ref} />
      {atributes.error && <span>{atributes.error}</span>}
    </InputStyle>
  )
}

export default forwardRef(Input)
