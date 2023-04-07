import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GuessForm from '../components/GuessForm';
import ScoreDisplay from '../components/ScoreDisplay';
import PriceDisplay from '../components/PriceDisplay';
import ProgressBar from '../components/ProgressBar';

import { getBtcUsdPrice } from '../api/coinbase';
import { createPlayer, getPlayer, Player } from '../api/players';
import { createGuess, Guess, GuessDirection } from '../api/guesses';
import GuessDisplay from '../components/GuessDisplay';

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
          toast('Welcome back!');
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
      toast('Your guess has been resolved!');
    }

  }, [player, resolvedGuess]);

  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!guessDirection || !/^(up|down)$/i.test(guessDirection)) {
      toast('Please enter a valid guess (up or down)');
      return;
    }

    try {
      if (!player) {
        toast('Player not found. Creating new player...');
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
      toast(`Guess submitted ${newGuess.guess} at ${newGuess.priceAtGuess}`);
      console.log(`Your guess is ${newGuess.guess}, with ID ${newGuess.id}`);
    } catch (error) {
      toast('Error submitting guess');
      console.error(error);
    }

  };

  return (
    <div className="bg-gray-50 h-screen">
      <nav className="bg-indigo-500 shadow-lg">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
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
            <div className="p-4 flex flex-col items-center">
              <GuessForm guess={guessDirection} setGuess={setGuessDirection} resolvedGuess={resolvedGuess} submitEvent={submitEvent} />
            </div>
            <div className="p-4 flex flex-col items-center">
              <div className="w-full">
                <GuessDisplay guessDirection={guess?.guess} priceAtGuess={guess?.priceAtGuess} />
              </div>
              <div className="w-full mt-4">
                <ProgressBar guess={guess} setPlayer={setPlayer} setResolvedGuess={setResolvedGuess}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default HomePage;