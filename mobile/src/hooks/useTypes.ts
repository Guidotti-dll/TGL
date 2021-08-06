import { useEffect, useState } from 'react'

import { Type } from '../Interfaces/game'
import api from '../services/api'
// import { toast } from 'react-toastify'

export const useTypes = () => {
  const [types, setTypes] = useState<Type[]>([])

  useEffect(() => {
    api
      .get('/games')
      .then(({ data }) => {
        setTypes(data)
      })
      .catch(error => alert(error.message))
  }, [])

  return { types }
}
