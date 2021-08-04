import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import { colors } from '../../constants/colors'
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
  type: string
}

const Input = ({
  placeholder,
  onBlur,
  onChangeText,
  error,
  value,
  type,
}: InputProps) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [focus, setFocus] = useState(false)
  return (
    <InputStyle>
      <TextInput
        label={placeholder}
        iconClass={FontAwesomeIcon}
        iconName=''
        iconColor={!focus ? '#dddddd' : colors.green}
        inputStyle={{
          // marginTop: 2,
          paddingBottom: 17,
          paddingLeft: 26,
          paddingRight: 26,
          color: '#9D9D9D',
          fontSize: 15,
          // borde,
        }}
        labelStyle={{
          marginBottom: 17,
          paddingLeft: 26,
          color: '#9D9D9D',
          fontSize: 15,
          fontWeight: 'bold',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
        secureTextEntry={type === 'password' ? hidePassword : false}
        inputPadding={16}
        labelHeight={6}
        onChangeText={onChangeText}
        // onBlur={onBlur}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        borderHeight={2}
        autoCapitalize='none'
      />
      {error && <TextError>{error}</TextError>}

      {type === 'password' && (
        <Feather
          name={hidePassword ? 'eye' : 'eye-off'}
          size={24}
          color='#C1C1C1'
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
