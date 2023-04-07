import { PlayerService } from '../../src/app/services/playerService'
import { type IPlayerRepository } from '../../src/interfaces/repositories/playerRepository'
import { type PlayerProps } from '../../src/app/domain/player'

describe('PlayerService', () => {
  const mockPlayerRepository: jest.Mocked<IPlayerRepository> = {
    getPlayerById: jest.fn(),
    createPlayer: jest.fn(),
    updatePlayerScore: jest.fn()
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('getPlayerById', () => {
    it('should return undefined when the player is not found', async () => {
      mockPlayerRepository.getPlayerById.mockResolvedValueOnce(undefined)
      const playerService = new PlayerService(mockPlayerRepository)
      const result = await playerService.getPlayerById('1')
      expect(result).toBeUndefined()
      expect(mockPlayerRepository.getPlayerById).toHaveBeenCalledWith('1')
    })

    it('should return the player when it is found', async () => {
      const mockPlayerData: PlayerProps = {
        id: 'some-id',
        score: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        addScore: jest.fn(),
        toPlainObject: jest.fn()
      }
      mockPlayerRepository.getPlayerById.mockResolvedValueOnce(mockPlayerData)
      const playerService = new PlayerService(mockPlayerRepository)
      const result = await playerService.getPlayerById('1')
      expect(result).toEqual(mockPlayerData)
      expect(mockPlayerRepository.getPlayerById).toHaveBeenCalledWith('1')
    })
  })

  describe('createPlayer', () => {
    it('should create a new player', async () => {
      const mockPlayerData: PlayerProps = {
        id: 'some-id',
        score: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        addScore: jest.fn(),
        toPlainObject: jest.fn()
      }
      mockPlayerRepository.createPlayer.mockResolvedValueOnce(mockPlayerData)
      const playerService = new PlayerService(mockPlayerRepository)
      const result = await playerService.createPlayer()
      expect(result).toEqual(mockPlayerData)
      expect(mockPlayerRepository.createPlayer).toHaveBeenCalled()
    })
  })
})
