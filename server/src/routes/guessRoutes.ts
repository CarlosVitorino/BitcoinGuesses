import { Router } from 'express'
import { GuessController } from '../app/controllers/guessController'
import { GuessService } from '../app/services/guessService'
import { GuessRepository } from '../interfaces/repositories/guessRepository'
import { PlayerRepository } from '../interfaces/repositories/playerRepository'
import { PriceFetcher } from '../interfaces/external/priceFetcher'

const guessRoutes = Router()

const guessRepository = new GuessRepository()
const playerRepository = new PlayerRepository()
const priceFetcher = new PriceFetcher()
const guessService = new GuessService(guessRepository, playerRepository, priceFetcher)
const guessController = new GuessController(guessService)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
guessRoutes.post('/create', guessController.createGuess)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
guessRoutes.post('/resolve/:playerId', guessController.resolveGuess)

export default guessRoutes
