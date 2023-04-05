import axios from 'axios'

export interface IPriceFetcher {
  fetchLatestPrice: () => Promise<number>
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
}
