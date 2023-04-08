import { Router } from 'express'
import { container } from '../bootstrap/container'

const guessRoutes = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
guessRoutes.post('/create', container.guessController.createGuess)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
guessRoutes.post('/resolve/:guessId', container.guessController.resolveGuess)

export default guessRoutes
