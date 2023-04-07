import { v4 as uuid } from 'uuid'
import { PriceDidntChangeError } from '../../errors/errors'

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

    if (this.priceAtGuess == null) {
      throw new Error('This guess has no price')
    }

    const isPriceHigher = price > (this.priceAtGuess)

    if (this.guess === 'up' && isPriceHigher) {
      this.isCorrect = true
    } else if (this.guess === 'down' && !isPriceHigher) {
      this.isCorrect = true
    } else if (price === (this.priceAtGuess)) {
      throw new PriceDidntChangeError()
    } else {
      this.isCorrect = false
    }

    this.resolvedAt = new Date()
  }

  toPlainObject (): any {
    return {
      id: this.id,
      playerId: this.playerId,
      guess: this.guess,
      priceAtGuess: this.priceAtGuess,
      createdAt: this.createdAt.toISOString(),
      resolvedAt: this.resolvedAt?.toISOString(),
      isCorrect: this.isCorrect
    }
  }
}
