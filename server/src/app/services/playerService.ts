import { type Player } from '../domain/player'
import { type IPlayerRepository } from '../../interfaces/repositories/playerRepository'

interface IPlayerService {
  createPlayer: () => Promise<Player>
  getPlayerById: (playerId: string) => Promise<Player | undefined>
}

class PlayerService implements IPlayerService {
  private readonly playerRepository: IPlayerRepository

  constructor (playerRepository: IPlayerRepository) {
    this.playerRepository = playerRepository
  }

  async getPlayerById (playerId: string): Promise<Player | undefined> {
    return await this.playerRepository.getPlayerById(playerId)
  }

  async createPlayer (): Promise<Player> {
    const player = await this.playerRepository.createPlayer()
    return player
  }
}

export { type IPlayerService, PlayerService }
