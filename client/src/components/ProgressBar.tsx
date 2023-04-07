import { useEffect, useState } from 'react';
import { Guess, resolveGuess } from '../api/guesses';
import { Player } from '../api/players';
import { toast } from 'react-toastify';

interface ProgressBarProps {
  guess: Guess | null;
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  setResolvedGuess: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const ProgressBar = ({ guess, setPlayer, setResolvedGuess }: ProgressBarProps) => {
  const [progress, setProgress] = useState(60);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const startTimer = async () => {
      let counter = 60;

      intervalId = setInterval(() => {
        if (counter === 0) {
          clearInterval(intervalId);
          resolveGuess(guess?.id!)
          .then((player) => {
            setPlayer(player);
            setResolvedGuess(true);

          }).catch(async (error) => {
            debugger;
            if (error.response && error.response.status === 400 && error.message === "Price at guess is still equal to current price") {
              toast("Price at guess is still equal to current price. Retrying in 5 seconds...");
              await new Promise(resolve => setTimeout(resolve, 5000));
              return resolveGuess(guess?.id!);

            } else {
              toast.error("An error occurred while resolving guess");
              console.error("An error occurred while resolving guess:", error);
              throw error;
            }
          });

        } else {
          counter--;
          setProgress(counter);
        }
      }, 1000);
    };

    if (guess != null && guess.resolvedAt == null) {
      startTimer();
    }

    return () => clearInterval(intervalId);
  }, [guess]);

  const style = { "--value": progress } as React.CSSProperties


  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Countdown</h2>
        <p>Your guess will be resolved in:</p>
        <div className="card-actions justify-end">
          <span className="countdown font-mono text-6xl">
            <span style={style}></span>
          </span>
        </div>
      </div>
    </div>

  );
};

export default ProgressBar;