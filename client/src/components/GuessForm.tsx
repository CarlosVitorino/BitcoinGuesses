import React, { useState } from 'react';

interface Props {
  guess: string;
  setGuess: React.Dispatch<React.SetStateAction<string>>;
  resolvedGuess: boolean | null;
  submitEvent: (e: React.FormEvent<HTMLFormElement>) => void;
}

const GuessForm: React.FC<Props> = ({ guess, setGuess, resolvedGuess, submitEvent }) => {

  return (
    <form onSubmit={submitEvent}>
      <div className="mt-8 max-w-md">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="text-gray-700" htmlFor="guess">
              Guess
            </label>
            <input
              className="form-input w-full mt-2 rounded-md shadow-sm"
              id="guess"
              name="guess"
              placeholder="up/down"
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md btn hover:bg-indigo-600 focus:bg-indigo-600"
              disabled={resolvedGuess != null}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GuessForm;