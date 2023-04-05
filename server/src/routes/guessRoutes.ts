import { Router } from 'express'
import { container } from '../container'

const guessRoutes = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
guessRoutes.post('/create', container.guessController.createGuess)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
guessRoutes.post('/resolve/:playerId', container.guessController.resolveGuess)

export default guessRoutes
