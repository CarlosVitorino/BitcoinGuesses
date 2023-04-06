import { GuessRepository } from './interfaces/repositories/guessRepository'
import { PlayerRepository } from './interfaces/repositories/playerRepository'
import { PriceFetcher } from './interfaces/external/priceFetcher'
import { GuessController } from './app/controllers/guessController'
import { PlayerController } from './app/controllers/playerController'
import { PlayerService } from './app/services/playerService'
import { GuessService } from './app/services/guessService'
import * as AWS from 'aws-sdk'

AWS.config.loadFromPath('./config/aws-config.json')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

const guessRepository = new GuessRepository(dynamoDb)
const playerRepository = new PlayerRepository(dynamoDb)
const priceFetcher = new PriceFetcher()

const guessService = new GuessService(guessRepository, playerRepository, priceFetcher)
const guessController = new GuessController(guessService)

const playerService = new PlayerService(playerRepository)
const playerController = new PlayerController(playerService)

export const container = {
  guessController,
  playerController
}
