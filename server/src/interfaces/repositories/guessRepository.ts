import { Guess, type GuessProps } from '../../app/domain/guess'

interface IGuessRepository {
  createGuess: (guessProps: GuessProps) => Promise<Guess>
  getUnresolvedGuessByPlayerId: (playerId: string) => Promise<Guess | undefined>
  resolveGuess: (guess: Guess, price: number) => Promise<void>
}

interface InMemoryDatabase {
  guesses: Record<string, Guess>
}

class GuessRepository implements IGuessRepository {
  private readonly db: InMemoryDatabase

  constructor () {
    this.db = {
      guesses: {}
    }
  }

  async createGuess (guessProps: GuessProps): Promise<Guess> {
    const guess = new Guess(guessProps)
    this.db.guesses[guess.id] = guess
    return guess
  }

  async getUnresolvedGuessByPlayerId (playerId: string): Promise<Guess | undefined> {
    return Object.values(this.db.guesses).find(guess => guess.playerId === playerId && guess.resolvedAt == null)
  }

  async resolveGuess (guess: Guess, price: number): Promise<void> {
    guess.resolveGuess(price)
  }
}

export { type IGuessRepository, GuessRepository }
