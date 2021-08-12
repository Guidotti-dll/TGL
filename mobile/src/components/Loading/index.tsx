import React from 'react'
import * as Progress from 'react-native-progress'

import { LoadingContainer } from './styles'

const Loading = () => {
  return (
    <LoadingContainer>
      <Progress.Circle
        size={100}
        color='#b5c401'
        indeterminate
        borderWidth={2}
      />
    </LoadingContainer>
  )
}

export default Loading
