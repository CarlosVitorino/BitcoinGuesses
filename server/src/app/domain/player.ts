import { v4 as uuid } from 'uuid'

export interface PlayerProps {
  id: string
  score: number
  createdAt: Date
  updatedAt: Date
}

export class Player {
  public id: string
  public score: number
  public createdAt: Date
  public updatedAt: Date

  constructor () {
    this.id = uuid()
    this.score = 0
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  addScore (amount: number): void {
    this.score += amount
    this.updatedAt = new Date()
  }

  toPlainObject (): any {
    return {
      id: this.id,
      score: this.score,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    }
  }
}
