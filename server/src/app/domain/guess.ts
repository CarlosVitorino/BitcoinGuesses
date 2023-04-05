import { v4 as uuid } from 'uuid'

type GuessDirection = 'up' | 'down'

export interface GuessProps {
  id?: string
  playerId: string
  guess: GuessDirection
  priceAtGuess?: number
  createdAt?: Date
  resolvedAt?: Date
  isCorrect?: boolean
}
export class Guess {
  public id: string
  public playerId: string
  public guess: GuessDirection
  public priceAtGuess?: number
  public createdAt: Date
  public resolvedAt?: Date
  public isCorrect?: boolean

  constructor (props: GuessProps, id?: string) {
    this.id = id ?? uuid()
    this.playerId = props.playerId
    this.guess = props.guess
    this.priceAtGuess = props.priceAtGuess
    this.createdAt = props.createdAt ?? new Date()
    this.resolvedAt = props.resolvedAt
    this.isCorrect = props.isCorrect
  }

  resolveGuess (price: number): void {
    if (this.resolvedAt != null) {
      throw new Error('This guess has already been resolved')
    }

    const isPriceHigher = price > (this.priceAtGuess ?? 0)
    if (this.guess === 'up' && isPriceHigher) {
      this.resolvedAt = new Date()
      this.isCorrect = true
    } else if (this.guess === 'down' && !isPriceHigher) {
      this.resolvedAt = new Date()
      this.isCorrect = true
    }
  }
}
