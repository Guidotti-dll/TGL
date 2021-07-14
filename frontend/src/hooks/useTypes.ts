import { useEffect, useState } from 'react'
import { Type } from '../interfaceies/game'
import api from '../services/api'
import { toast } from 'react-toastify'

export const useTypes = () => {
  const [types, setTypes] = useState<Type[]>([])

  useEffect(() => {
    api
      .get('/games.json')
      .then(({ data }) => {
        setTypes(data.types)
      })
      .catch(error => toast.error(error.message))
  }, [])

  return { types }
}
