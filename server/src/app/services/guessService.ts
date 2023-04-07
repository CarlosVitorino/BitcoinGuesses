import { Guess, type GuessProps } from '../domain/guess'
import { type Player } from '../domain/player'
import { type IGuessRepository } from '../../interfaces/repositories/guessRepository'
import { type IPlayerRepository } from '../../interfaces/repositories/playerRepository'
import { type IPriceFetcher } from '../../interfaces/external/priceFetcher'
import { GuessTooRecentError } from '../../errors/errors'

interface IGuessService {
  createGuess: (guessProps: GuessProps) => Promise<Guess | undefined>
  getUnresolvedGuess: (guessId: string) => Promise<Guess | undefined>
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

  async createGuess (guessProps: GuessProps): Promise<Guess | undefined> {
    const latestPrice = await this.priceFetcher.fetchLatestPrice()
    guessProps.priceAtGuess = latestPrice
    let guess = new Guess(guessProps)
    guess = await this.guessRepository.createGuess(guess)
    return guess
  }

  async getUnresolvedGuess (guessId: string): Promise<Guess | undefined> {
    return await this.guessRepository.getUnresolvedGuess(guessId)
  }

  async resolveGuess (guess: Guess): Promise<Player | undefined> {
    const latestPrice = await this.priceFetcher.fetchLatestPrice()
    const elapsedSeconds = (new Date().getTime() - guess.createdAt.getTime()) / 1000
    if (elapsedSeconds <= 60) {
      throw new GuessTooRecentError()
    }

    await this.guessRepository.resolveGuess(guess, latestPrice)
    const playerUpdated = await this.playerRepository.updatePlayerScore(guess.playerId, guess.isCorrect)

    return playerUpdated
  }
}

export { type IGuessService, GuessService }
