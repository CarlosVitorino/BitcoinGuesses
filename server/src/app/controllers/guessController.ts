import { type Request, type Response } from 'express'
import { type IGuessService } from '../services/guessService'
import { type GuessProps } from '../domain/guess'

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

    const player = await this.guessService.resolveGuess(guess)
    res.status(200).send(player)
  }
}
