export class PriceAtGuessError extends Error {
  constructor () {
    super('Price at guess is incorrect!')
  }
}

export class GuessTooRecentError extends Error {
  constructor () {
    super('Guess must be at least 60 seconds old before it can be resolved')
  }
}

export class PriceDidntChangeError extends Error {
  constructor () {
    super('Price at guess is still equal to current price')
  }
}
