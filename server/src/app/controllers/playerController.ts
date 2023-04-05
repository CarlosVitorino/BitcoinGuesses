import type { Request, Response } from 'express'
import { type IPlayerService } from '../services/playerService'

export class PlayerController {
  private readonly playerService: IPlayerService

  constructor (playerService: IPlayerService) {
    this.playerService = playerService
    this.createPlayer = this.createPlayer.bind(this)
    this.Player = this.Player.bind(this)
  }

  public async createPlayer (req: Request, res: Response): Promise<void> {
    const result = await this.playerService.createPlayer()

    res.status(201).json(result)
  }

  public async Player (req: Request, res: Response): Promise<void> {
    const playerId = req.params.playerId
    const player = await this.playerService.getPlayerById(playerId)

    if (player != null) {
      res.status(200).json(player)
    } else {
      res.status(404).json({ error: 'Player not found' })
    }
  }

/*   public async getPlayerScore (req: Request, res: Response): Promise<void> {
    const playerId = req.params.playerId

    const result = await this.playerService.getPlayerScore(playerId)

    if (result != null) {
      res.status(200).json(result)
    } else {
      res.status(404).json({ error: 'Player not found' })
    }
  } */
}
