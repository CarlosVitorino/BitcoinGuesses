import { PlayerRepository } from '../../src/interfaces/repositories/playerRepository'
import { Player, type PlayerProps } from '../../src/app/domain/player'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

jest.mock('aws-sdk/clients/dynamodb', () => {
  return {
    DocumentClient: jest.fn().mockReturnValue({
      get: jest.fn(),
      put: jest.fn(),
      update: jest.fn()
    })
  }
})

describe('PlayerRepository', () => {
  let playerRepository: PlayerRepository
  let mockGetPlayerById: jest.SpyInstance
  let mockPut: jest.SpyInstance
  let mockGet: jest.SpyInstance
  let mockUpdate: jest.SpyInstance

  beforeEach(() => {
    const dynamoDb: DocumentClient = new DocumentClient()
    playerRepository = new PlayerRepository(dynamoDb)

    mockGetPlayerById = jest.spyOn(playerRepository, 'getPlayerById')
    mockPut = dynamoDb.put as jest.Mock
    mockPut.mockReturnValue({ promise: jest.fn().mockResolvedValue({ Item: undefined }) } as any)
    mockGet = dynamoDb.get as jest.Mock
    mockGet.mockReturnValue({ promise: jest.fn().mockResolvedValue({ Item: undefined }) } as any)
    mockUpdate = dynamoDb.update as jest.Mock
    mockUpdate.mockImplementation(() => ({ promise: jest.fn().mockResolvedValue({ Item: undefined }) }) as any)
  })

  describe('createPlayer', () => {
    it('creates a new player with a default score of 0', async () => {
      const player = await playerRepository.createPlayer()

      expect(player).toBeInstanceOf(Player)
      expect(player.score).toBe(0)
      expect(mockPut).toHaveBeenCalledWith(expect.objectContaining({
        TableName: 'players',
        Item: expect.objectContaining({
          id: expect.any(String),
          score: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      }))
    })
  })

  describe('getPlayerById', () => {
    it('returns undefined when no player with the given id is found', async () => {
      const player = await playerRepository.getPlayerById('some-id')

      expect(player).toBeUndefined()
      expect(mockGet).toHaveBeenCalledWith(expect.objectContaining({
        TableName: 'players',
        Key: {
          id: 'some-id'
        }
      }))
    })

    it('returns a player when a player with the given id is found', async () => {
      const playerData: PlayerProps = {
        id: 'some-id',
        score: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        addScore: jest.fn(),
        toPlainObject: jest.fn()
      }
      const player = await playerRepository.getPlayerById('some-id')

      if (player != null) {
        expect(player).toBeInstanceOf(Player)
        expect(player.id).toBe(playerData.id)
        expect(player.score).toBe(playerData.score)
      }

      expect(mockGet).toHaveBeenCalledWith(expect.objectContaining({
        TableName: 'players',
        Key: {
          id: 'some-id'
        }
      }))
    })
  })

  describe('updatePlayerScore', () => {
    it('should return undefined if player is not found', async () => {
      mockGetPlayerById.mockResolvedValueOnce(undefined)

      const result = await playerRepository.updatePlayerScore('1', true)

      expect(result).toBeUndefined()
      expect(mockGetPlayerById).toHaveBeenCalledTimes(1)
      expect(mockUpdate).not.toHaveBeenCalled()
    })

    it('should update player score correctly and return the updated player', async () => {
      const mockPlayerData: PlayerProps = {
        id: '1',
        score: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        addScore: jest.fn(),
        toPlainObject: jest.fn()
      }
      const mockPlayer = new Player(mockPlayerData)

      mockGetPlayerById.mockResolvedValueOnce(mockPlayer)

      const result = await playerRepository.updatePlayerScore('1', true)

      expect(result).toEqual(mockPlayer)
      expect(mockUpdate).toHaveBeenCalledWith({
        TableName: 'players',
        Key: { id: '1' },
        UpdateExpression: 'set updatedAt = :updatedAt,  score = :score',
        ExpressionAttributeValues: {
          ':updatedAt': mockPlayer.updatedAt.toISOString(),
          ':score': mockPlayerData.score + 1
        }
      })
    })
  })
})
