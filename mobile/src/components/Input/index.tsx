import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import { colors } from '../../constants/colors'
import { InputStyle, TextInput, TextError } from './styles'

interface InputProps {
  onChangeText?: (value: string) => void
  value?: string
  placeholder?: string
  error?: string
  type: string
}

const Input = ({
  placeholder,
  onChangeText,
  error,
  type,
  value,
}: InputProps) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [focus, setFocus] = useState(false)
  return (
    <InputStyle>
      <TextInput
        label={placeholder}
        iconClass={FontAwesomeIcon}
        iconName=''
        iconColor={error ? 'red' : !focus ? '#dddddd' : colors.green}
        inputStyle={{
          paddingBottom: 17,
          paddingLeft: 26,
          paddingRight: 65,
          color: '#9D9D9D',
          fontSize: 15,
        }}
        labelStyle={{
          marginBottom: 17,
          paddingLeft: 26,
          color: '#9D9D9D',
          fontSize: 15,
          fontWeight: 'bold',
        }}
        value={value}
        secureTextEntry={type === 'password' ? hidePassword : false}
        inputPadding={16}
        labelHeight={6}
        onChangeText={onChangeText}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        borderHeight={2}
        autoCapitalize='none'
      />
      {error && <TextError>{error}</TextError>}
      {type === 'password' && (
        <Feather
          name='eye'
          size={24}
          color={!hidePassword ? colors.green : '#C1C1C1'}
          style={{
            position: 'absolute',
            top: 24,
            right: 31,
          }}
          onPress={() => setHidePassword(prevState => !prevState)}
        />
      )}
    </InputStyle>
  )
}

export default Input
