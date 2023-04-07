import axios from 'axios';

export const getBtcUsdPrice = async (): Promise<number> => {
  const response = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot');
  const data = response.data.data;
  return parseFloat(data.amount);
};
