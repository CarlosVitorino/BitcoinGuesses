import type { Request, Response } from 'express'
import { PlayerController } from '../../src/app/controllers/playerController'
import { type IPlayerService } from '../../src/app/services/playerService'
import { type Player, type PlayerProps } from '../../src/app/domain/player'

describe('PlayerController', () => {
  let playerController: PlayerController
  const mockPlayerData: PlayerProps = {
    id: 'some-id',
    score: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    addScore: jest.fn(),
    toPlainObject: jest.fn()
  }
  const mockPlayerService: jest.Mocked<IPlayerService> = {
    getPlayerById: jest.fn(async (playerId: string) => {
      if (playerId === 'some-id') {
        return await Promise.resolve(playerId === 'some-id' ? mockPlayerData as Player : undefined)
      }
    }),
    createPlayer: jest.fn()
  }

  beforeEach(() => {
    playerController = new PlayerController(mockPlayerService)
  })

  describe('createPlayer', () => {
    it('should create a new player', async () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const mockRequest = {} as Request
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response

      await playerController.createPlayer(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(mockResponse.json).toHaveBeenCalled()
    })
  })

  describe('getPlayer', () => {
    it('should return a player when it exists', async () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const mockRequest = {
        params: {
          playerId: 'some-id'
        }
      } as unknown as Request
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response

      await playerController.Player(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalled()
    })

    it('should return a 404 error when the player does not exist', async () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const mockRequest = {
        params: {
          playerId: 'non-existent-id'
        }
      } as unknown as Request
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response

      await playerController.Player(mockRequest, mockResponse)

      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Player not found' })
    })
  })
})
