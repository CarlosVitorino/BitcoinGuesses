import { Player } from '../../app/domain/player'

export interface IPlayerRepository {
  createPlayer: () => Promise<Player>
  getPlayerById: (id: string) => Promise<Player | undefined>
  updatePlayerScore: (playerId: string, isCorrect: boolean | undefined) => Promise<Player | undefined>
}

interface InMemoryDatabase {
  players: Record<string, Player>
}

export class PlayerRepository implements IPlayerRepository {
  private readonly db: InMemoryDatabase

  constructor () {
    this.db = {
      players: {}
    }
  }

  async createPlayer (): Promise<Player> {
    const player = new Player()

    this.db.players[player.id] = player

    return player
  }

  async getPlayerById (id: string): Promise<Player | undefined> {
    return this.db.players[id]
  }

  async updatePlayerScore (playerId: string, isCorrect: boolean | undefined): Promise<Player | undefined> {
    const player = this.db.players[playerId]
    if (player != null && isCorrect != null) {
      player.addScore(isCorrect ? 1 : -1)
      this.db.players[playerId] = player
    }

    return player
  }
}
