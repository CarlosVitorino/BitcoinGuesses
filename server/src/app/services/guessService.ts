import { Guess, type GuessProps } from '../domain/guess'
import { type Player } from '../domain/player'
import { type IGuessRepository } from '../../interfaces/repositories/guessRepository'
import { type IPlayerRepository } from '../../interfaces/repositories/playerRepository'
import { type IPriceFetcher } from '../../interfaces/external/priceFetcher'

interface IGuessService {
  createGuess: (guessProps: GuessProps) => Promise<void>
  getUnresolvedGuessByPlayerId: (playerId: string) => Promise<Guess | undefined>
  resolveGuess: (guess: Guess) => Promise<Player | undefined>
}

class GuessService implements IGuessService {
  private readonly guessRepository: IGuessRepository
  private readonly playerRepository: IPlayerRepository
  private readonly priceFetcher: IPriceFetcher

  constructor (guessRepository: IGuessRepository, playerRepository: IPlayerRepository, priceFetcher: IPriceFetcher) {
    this.guessRepository = guessRepository
    this.playerRepository = playerRepository
    this.priceFetcher = priceFetcher
  }

  async createGuess (guessProps: GuessProps): Promise<void> {
    const guess = new Guess(guessProps)
    await this.guessRepository.createGuess(guess)
  }

  async getUnresolvedGuessByPlayerId (playerId: string): Promise<Guess | undefined> {
    return await this.guessRepository.getUnresolvedGuessByPlayerId(playerId)
  }

  async resolveGuess (guess: Guess): Promise<Player | undefined> {
    const latestPrice = await this.priceFetcher.fetchLatestPrice()

    await this.guessRepository.resolveGuess(guess, latestPrice)
    const playerUpdated = await this.playerRepository.updatePlayerScore(guess.playerId, guess.isCorrect)

    return playerUpdated
  }
}

export { type IGuessService, GuessService }
