import React from 'react';

interface Props {
  guessDirection: string | undefined
  priceAtGuess: number | undefined
}

const GuessDisplay: React.FC<Props> = ({ guessDirection, priceAtGuess }) => {
  return (
    <div className="stats shadow w-full">
      <div className="stat place-items-center">
        <div className="stat-title">Your Guess</div>
        <div className="stat-value">{guessDirection}</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Value At Guess</div>
        <div className="stat-value text-primary">{priceAtGuess}</div>
      </div>  
    </div>
  );
};

export default GuessDisplay;