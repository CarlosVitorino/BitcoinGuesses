import { type DynamoDB } from 'aws-sdk'
import { type DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Guess, type GuessProps } from '../../app/domain/guess'

interface IGuessRepository {
  createGuess: (guessProps: GuessProps) => Promise<Guess>
  getUnresolvedGuess: (id: string) => Promise<Guess | undefined>
  resolveGuess: (guess: Guess, price: number) => Promise<void>
}

class GuessRepository implements IGuessRepository {
  private readonly tableName: string = 'guesses'
  private readonly client: DocumentClient

  constructor (dynamoDb: DynamoDB.DocumentClient) {
    this.client = dynamoDb
  }

  async createGuess (guessProps: GuessProps): Promise<Guess> {
    const guess = new Guess(guessProps)
    const params = {
      TableName: this.tableName,
      Item: guess.toPlainObject()
    }

    await this.client.put(params).promise()

    return guess
  }

  async getUnresolvedGuess (id: string): Promise<Guess | undefined> {
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

    const { createdAt, resolvedAt, ...rest } = result.Item as GuessProps
    const guess: GuessProps = {
      ...rest,
      createdAt: createdAt != null ? new Date(createdAt) : undefined,
      resolvedAt: resolvedAt != null ? new Date(resolvedAt) : undefined
    }

    return new Guess(guess)
  }

  async resolveGuess (guess: Guess, price: number): Promise<void> {
    guess.resolveGuess(price)
    const params = {
      TableName: this.tableName,
      Key: {
        id: guess.id
      },
      UpdateExpression: 'set resolvedAt = :resolvedAt, price = :price',
      ExpressionAttributeValues: {
        ':resolvedAt': new Date().toISOString(),
        ':price': price
      }
    }

    await this.client.update(params).promise()
  }
}

export { type IGuessRepository, GuessRepository }
