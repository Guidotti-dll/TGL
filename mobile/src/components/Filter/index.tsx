import React, { useState } from 'react'

import { Type } from '../../Interfaces/game'
import { useTypes } from '../../hooks/useTypes'
import { FilterContainer, GameButton, GameButtonText } from './styles'

const Filter: React.FC = () => {
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

  return (
    <FilterContainer
      horizontal
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
        </GameButton>
      )}
    />
  )
}

export default Filter
