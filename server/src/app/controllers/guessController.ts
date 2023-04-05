import { type Request, type Response } from 'express'
import { type IGuessService } from '../services/guessService'
import { type GuessProps } from '../domain/guess'
import { PriceAtGuessError, GuessTooRecentError } from '../../errors/errors'

export class GuessController {
  private readonly guessService: IGuessService

  constructor (guessService: IGuessService) {
    this.guessService = guessService
    this.createGuess = this.createGuess.bind(this)
    this.resolveGuess = this.resolveGuess.bind(this)
  }

  public async createGuess (req: Request, res: Response): Promise<void> {
    const guessProps: GuessProps = req.body
    await this.guessService.createGuess(guessProps)
    res.status(201).send()
  }

  public async resolveGuess (req: Request, res: Response): Promise<void> {
    const playerId: string = req.params.playerId
    const guess = await this.guessService.getUnresolvedGuessByPlayerId(playerId)
    if (guess == null) {
      res.status(404).send()
      return
    }

    try {
      const player = await this.guessService.resolveGuess(guess)
      res.status(200).send(player)
    } catch (error) {
      if (error instanceof PriceAtGuessError) {
        res.status(400).json({ message: error.message })
      } else if (error instanceof GuessTooRecentError) {
        res.status(400).json({ message: error.message })
      } else {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  }
}
