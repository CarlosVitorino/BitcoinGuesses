import { useEffect, useState } from 'react'
import { Guess, resolveGuess } from '../api/guesses'
import { Player } from '../api/players'
import { toast } from 'react-toastify'
import { getBtcUsdPrice } from '../api/coinbase'

interface ProgressBarProps {
  guess: Guess | null
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>
  setResolvedGuess: React.Dispatch<React.SetStateAction<boolean | null>>
}

  const ProgressBar = ({ guess, setPlayer, setResolvedGuess }: ProgressBarProps) => {
  const [progress, setProgress] = useState(60)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    const startTimer = async () => {
      let counter = 60

      let intervalId = setInterval(async () => {
        if (counter === 0) {
          const latestPrice = await getBtcUsdPrice()
          while(guess?.priceAtGuess === latestPrice){
            // wait for price to change
            await new Promise(r => setTimeout(r, 1000))
          }
          clearInterval(intervalId)
          resolveGuess(guess?.id!)
            .then((player) => {
              setPlayer(player)
              setResolvedGuess(true)
            }).catch(async (error) => {
                toast.error("An error occurred while resolving guess")
                console.error("An error occurred while resolving guess:", error)
                throw error
            })

        } else {
          counter--
          setProgress(counter)
        }
      }, 1000)
    }

    if (guess != null && guess.resolvedAt == null) {
      startTimer()
    }

    return () => clearInterval(intervalId)
  }, [guess])

  const style = { "--value": progress } as React.CSSProperties

  return (
    <div className="card w-100 bg-primary text-primary-content">
      <div className="card-body w-full"> {/* add w-full class */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="card-title">Countdown</h2>
            <p>Your guess will be resolved in:</p>
          </div>
          <div className="card-actions justify-end">
            <span className="countdown font-mono text-6xl">
              <span style={style}></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar