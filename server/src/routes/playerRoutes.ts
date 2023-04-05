import { Router } from 'express'
import { PlayerController } from '../app/controllers/playerController'
import { PlayerService } from '../app/services/playerService'
import { PlayerRepository } from '../interfaces/repositories/playerRepository'

const playerRoutes = Router()

const playerRepository = new PlayerRepository()
const playerService = new PlayerService(playerRepository)
const playerController = new PlayerController(playerService)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
playerRoutes.get('/create', playerController.createPlayer)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
playerRoutes.get('/:playerId', playerController.Player)

export default playerRoutes
