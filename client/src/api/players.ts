import axios from 'axios';

const baseUrl = 'http://localhost:8080/players';

export interface Player {
  id: string
  score: number
  createdAt: Date
  updatedAt: Date
}

export const createPlayer = async (): Promise<Player> => {
  const response = await axios.get(`${baseUrl}/create`);
  const data = response.data;
  localStorage.setItem('playerId', data.id);
  console.log('Player created:', data)
  return data;
};

export const getPlayer = async (playerId: string): Promise<Player> => {
  const response = await axios.get(`${baseUrl}/${playerId}`);
  return response.data;
};