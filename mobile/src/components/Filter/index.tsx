import { Octicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { Type } from '../../Interfaces/game'
import { colors } from '../../constants/colors'
import { useTypes } from '../../hooks/useTypes'
import { GameButton, GameButtonText } from './styles'

interface Props {
  setFilter: (filters: string[]) => void
}

const Filter: React.FC<Props> = ({ setFilter }: Props) => {
  const { types } = useTypes()
  const [selectedFilter, setSelectedFilter] = useState<any>({})

  const handleChangeFilter = (type: Type) => {
    const tempSelectedFilter = selectedFilter
    if (tempSelectedFilter?.[type.type]) {
      delete tempSelectedFilter?.[type.type]
    } else {
      tempSelectedFilter[type.type] = type
    }

    setSelectedFilter({ ...tempSelectedFilter })
  }

  useEffect(() => {
    setFilter(Object.keys(selectedFilter))
  }, [selectedFilter])
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator
      data={types}
      keyExtractor={item => item.color}
      renderItem={({ item }) => (
        <GameButton
          onPress={() => handleChangeFilter(item)}
          isSelected={!!selectedFilter?.[item.type]}
          color={item.color}
          key={item.id}
        >
          <GameButtonText
            isSelected={!!selectedFilter?.[item.type]}
            color={item.color}
          >
            {item.type}
          </GameButtonText>
          {!!selectedFilter?.[item.type] && (
            <Octicons
              name='x'
              size={11}
              color={colors.white}
              style={{ position: 'absolute', right: 6, top: 0 }}
            />
          )}
        </GameButton>
      )}
    />
  )
}

export default Filter
