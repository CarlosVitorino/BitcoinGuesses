import React from 'react'

interface Props {
  guess: string
  setGuess: React.Dispatch<React.SetStateAction<string>>
  resolvedGuess: boolean | null
  submitEvent: (e: React.FormEvent<HTMLFormElement>) => void
}

const GuessForm: React.FC<Props> = ({ guess, setGuess, resolvedGuess, submitEvent }) => {
  return (
    <div className="card w-100 bg-base-100">
      <div className="card-body">
        <h2 className="card-title">Predict BTC/USD price movement in 1 minute</h2>
        <p> Enter your guess and click the button to play.</p>
        <form onSubmit={submitEvent}>
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
          <div className="card-actions justify-end">
            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={resolvedGuess != null}
            >
              PLAY
            </button>
          </div>
        </form>
      </div>
    </div >

  )
}

export default GuessForm