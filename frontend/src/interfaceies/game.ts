export interface Game {
  type: string
  color: string
  date: string
  price: number
  numbers: number[]
}

export interface Type {
  type: string
  color: string
  description: string
  range: number
  'max-number': number
  price: number
  'min-cart-value': number
}
