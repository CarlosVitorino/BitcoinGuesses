import React from 'react';

interface Props {
  score: number;
}

const ScoreDisplay: React.FC<Props> = ({ score }) => {
  return (
    <div className="flex items-center justify-center md:mr-6">
      <span className="text-lg text-gray-700 mr-2">Score:</span>
      <span className="text-lg font-bold">{score}</span>
    </div>
  );
};

export default ScoreDisplay;