import axios from 'axios'

export interface IPriceFetcher {
  fetchLatestPrice: () => Promise<number>
  fetchPriceAt: (timestamp: Date) => Promise<number>

}

export class PriceFetcher implements IPriceFetcher {
  private readonly apiUrl: string = 'https://api.coinbase.com/v2/prices/BTC-USD/spot'

  public async fetchLatestPrice (): Promise<number> {
    try {
      const response = await axios.get(this.apiUrl)
      return parseFloat(response.data.data.amount)
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch latest BTC price')
    }
  }

  public async fetchPriceAt (timestamp: Date): Promise<number> {
    try {
      const url = `${this.apiUrl}?date=${timestamp.toISOString()}`
      const response = await axios.get(url)
      return parseFloat(response.data.data.amount)
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to fetch BTC price at timestamp: ${timestamp.toISOString()}`)
    }
  }
}
