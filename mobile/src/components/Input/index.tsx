import React from 'react'

import { InputStyle, TextInput, TextError } from './styles'
interface InputProps {
  // text: string
  onBlur?: () => void
  // onFocus?: () => void
  onChangeText?: (value: string) => void
  value?: string
  // validData?: boolean
  placeholder?: string
  // inputError?: boolean
  error?: string
  // name: string
}

const Input = ({
  placeholder,
  onBlur,
  onChangeText,
  error,
  value,
}: InputProps) => {
  return (
    <InputStyle>
      <TextInput
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
      />
      {error && <TextError>{error}</TextError>}
    </InputStyle>
  )
}

export default Input
