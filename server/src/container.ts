import { GuessRepository } from './interfaces/repositories/guessRepository'
import { PlayerRepository } from './interfaces/repositories/playerRepository'
import { PriceFetcher } from './interfaces/external/priceFetcher'
import { GuessController } from './app/controllers/guessController'
import { PlayerController } from './app/controllers/playerController'
import { PlayerService } from './app/services/playerService'
import { GuessService } from './app/services/guessService'

const guessRepository = new GuessRepository()
const playerRepository = new PlayerRepository()
const priceFetcher = new PriceFetcher()

const guessService = new GuessService(guessRepository, playerRepository, priceFetcher)
const guessController = new GuessController(guessService)

const playerService = new PlayerService(playerRepository)
const playerController = new PlayerController(playerService)

export const container = {
  guessController,
  playerController
}
