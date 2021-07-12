import { Game } from './game'

export interface User {
  name: string
  email: string
  recentGames: Game[]
}
