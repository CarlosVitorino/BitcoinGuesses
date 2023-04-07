import { Player, type PlayerProps } from '../../src/app/domain/player'

jest.resetAllMocks()

describe('Player', () => {
  describe('constructor', () => {
    it('should initialize the player with default values when no data is provided', () => {
      const player = new Player()
      expect(player.id).toBeDefined()
      expect(player.score).toBe(0)
      expect(player.createdAt).toBeInstanceOf(Date)
      expect(player.updatedAt).toBeInstanceOf(Date)
    })

    it('should initialize the player with provided data', () => {
      const mockPlayerData: PlayerProps = {
        id: '1',
        score: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        addScore: jest.fn(),
        toPlainObject: jest.fn()
      }

      const player = new Player(mockPlayerData)
      expect(player.id).toBe(mockPlayerData.id)
      expect(player.score).toBe(mockPlayerData.score)
      expect(player.createdAt).toBe(mockPlayerData.createdAt)
      expect(player.updatedAt).toBe(mockPlayerData.updatedAt)
    })
  })

  describe('addScore', () => {
    it('should increase the player score', () => {
      const player = new Player()
      const initialScore = player.score
      const amount = 1

      player.addScore(amount)
      expect(player.score).toBe(initialScore + amount)
    })
  })

  describe('toPlainObject', () => {
    it('should return a plain object with player properties', () => {
      const player = new Player()
      const plainObject = player.toPlainObject()
      expect(plainObject.id).toBe(player.id)
      expect(plainObject.score).toBe(player.score)
      expect(plainObject.createdAt).toBe(player.createdAt.toISOString())
      expect(plainObject.updatedAt).toBe(player.updatedAt.toISOString())
    })
  })
})
