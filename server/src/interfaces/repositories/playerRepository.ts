import { type DynamoDB } from 'aws-sdk'
import { type DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Player } from '../../app/domain/player'

export interface IPlayerRepository {
  createPlayer: () => Promise<Player>
  getPlayerById: (id: string) => Promise<Player | undefined>
  updatePlayerScore: (playerId: string, isCorrect: boolean | undefined) => Promise<Player | undefined>
}

export class PlayerRepository implements IPlayerRepository {
  private readonly tableName: string = 'players'
  private readonly client: DocumentClient

  constructor (dynamoDb: DynamoDB.DocumentClient) {
    this.client = dynamoDb
  }

  async createPlayer (): Promise<Player> {
    const player = new Player()
    const params = {
      TableName: this.tableName,
      Item: player.toPlainObject()
    }

    await this.client.put(params).promise()

    return player
  }

  async getPlayerById (id: string): Promise<Player | undefined> {
    const params = {
      TableName: this.tableName,
      Key: {
        id
      }
    }

    const result = await this.client.get(params).promise()

    if (result.Item == null) {
      return undefined
    }

    return result.Item as Player
  }

  async updatePlayerScore (playerId: string, isCorrect: boolean | undefined): Promise<Player | undefined> {
    const player = await this.getPlayerById(playerId)

    if (player != null && isCorrect != null) {
      player.addScore(isCorrect ? 1 : -1)
      const params = {
        TableName: this.tableName,
        Key: {
          id: playerId
        },
        UpdateExpression: 'set updatedAt = :updatedAt,  score = :score',
        ExpressionAttributeValues: {
          ':updatedAt': player.updatedAt.toISOString(),
          ':score': player.score
        }
      }

      await this.client.update(params).promise()
    }

    return player
  }
}
