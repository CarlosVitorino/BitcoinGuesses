import axios from 'axios'
import { Player } from './players'

const baseUrl = 'http://localhost:8080/guesses'
export type GuessDirection = 'up' | 'down'

export interface Guess {
  id?: string
  playerId: string
  guess: GuessDirection
  priceAtGuess?: number
  createdAt?: Date
  resolvedAt?: Date
  isCorrect?: boolean
}

export const createGuess = async (guess: Guess): Promise<Guess> => {
  const response = await axios.post(`${baseUrl}/create`, guess)
  return response.data
}

export const resolveGuess = async (guessId: string): Promise<Player> => {
  const response = await axios.post(`${baseUrl}/resolve/${guessId}`)
  return response.data
}