import React, { useState, useEffect } from 'react';
import GuessForm from '../components/GuessForm';
import ScoreDisplay from '../components/ScoreDisplay';
import PriceDisplay from '../components/PriceDisplay';
import ProgressBar from '../components/ProgressBar';

import { getBtcUsdPrice } from '../api/coinbase';
import { createPlayer, getPlayer, Player } from '../api/players';
import { createGuess, Guess, GuessDirection } from '../api/guesses';

const HomePage: React.FC = () => {
  const [score, setScore] = useState(0);
  const [guessDirection, setGuessDirection] = useState('');
  const [guess, setGuess] = useState<Guess | null>(null);
  const [latestPrice, setLatestPrice] = useState(0);
  const [player, setPlayer] = useState<Player | null>(null);
  const [resolvedGuess, setResolvedGuess] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await getBtcUsdPrice();
      setLatestPrice(price);
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const localPlayerId = localStorage.getItem('playerId');
    if (localPlayerId) {
      getPlayer(localPlayerId)
        .then((player) => {
          setPlayer(player);
          setScore(player.score);
        })
        .catch(() => {
          console.log('Error fetching player');
        });
    } else {
      createPlayer()
        .then((player) => {
          localStorage.setItem('playerId', player.id);
          setPlayer(player);
          setScore(player.score);
        })
        .catch(() => {
          console.log('Error creating player');
        });
    }
  }, []);

  useEffect(() => {
    if (resolvedGuess) {
      console.log('Guess resolved:', resolvedGuess);
      setResolvedGuess(null);
      setScore(player?.score!);
    }

  }, [player, resolvedGuess]);

  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!guessDirection || !/^(up|down)$/i.test(guessDirection)) {
      console.log('Please enter a valid guess (up or down)');
      return;
    }

    try {
      if (!player) {
        console.log('Player not found. Creating new player...');
        const newPlayer = await createPlayer();
        setPlayer(newPlayer);
        console.log('Player created:', newPlayer);
      }

      let newGuess: Guess = {
        playerId: player?.id!,
        guess: guessDirection.toLowerCase() as GuessDirection,
        priceAtGuess: latestPrice,
      };
      newGuess = await createGuess(newGuess);
      setGuess(newGuess);
      setResolvedGuess(false);
      console.log(`Your guess is ${newGuess.guess}, with ID ${newGuess.id}`);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="bg-gray-50 h-screen">
      <nav className="bg-indigo-500 shadow-lg">
        <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-white">
              <h1 className="text-3xl font-medium">Guess the Bitcoin Price</h1>
              <p className="text-gray-600 text-sm">
                Disclaimer: The Bitcoin price is sourced from Coinbase.
              </p>
            </div>
          </div>

          <div className="md:flex md:items-center">
            <ScoreDisplay score={score} />
            <PriceDisplay price={latestPrice} />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="md:flex md:items-center md:justify-center">
          <div className="grid grid-cols-2 gap-20">
            <div className="p-4">
              <GuessForm guess={guessDirection} setGuess={setGuessDirection} resolvedGuess={resolvedGuess} submitEvent={submitEvent} />
            </div>
            <div className="p-4">
              <ProgressBar guess={guess} setPlayer={setPlayer} setResolvedGuess={setResolvedGuess}/>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default HomePage;