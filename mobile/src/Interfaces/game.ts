/* eslint-disable camelcase */
export interface Game {
  game_id: number
  type: string
  color: string
  date: string
  price: number
  numbers: number[]
}

export interface Type {
  id: number
  type: string
  color: string
  description: string
  range: number
  'max-number': number
  price: number
  'min-cart-value': number
}
