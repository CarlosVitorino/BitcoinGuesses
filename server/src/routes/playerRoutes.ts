import { Router } from 'express'
import { container } from '../bootstrap/container'

const playerRoutes = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
playerRoutes.get('/create', container.playerController.createPlayer)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
playerRoutes.get('/:playerId', container.playerController.Player)

export default playerRoutes
