# Bitcoin Price Guessing Game
This is a web app that allows users to make guesses on whether the market price of Bitcoin (BTC/USD) will be higher or lower after one minute.

## Functionality
Users can:

* See their current score and the latest available BTC price in USD
* Choose to enter a guess of either "up" or "down"
* Only make one guess at a time (each 60s)
* Have their guess resolved when the price changes and at least 60 seconds have passed since the guess was made
* Get 1 point added to their score if their guess is correct, or lose 1 point if their guess is incorrect
* Start with a score of 0
* The can close their browser and return to see their score and continue to make more guesses

## How to run the application
> The project consists of a client (ReactJS, TailwindCSS) and a server (NodeJS, ExpressJS, AWS - DynamoDB) written in TypeScript.

To run the app locally, follow these steps:

### Client
To run the client:

1. Navigate to the `/client` folder in your terminal.
2. Run `npm install` to install the required dependencies.
3. Run `npm run start` to start the development server.


### Server
To run the server:

1. Navigate to the `/server` folder of the project in your terminal.
2. Run `npm install` to install the required dependencies.
3. In `/server/config` duplicate the file `aws-config_dev.json` as `aws-config.json` and add your aws credentials.
4. Run `npm run build` to build the server project.
5. Run `npm run start` to start the server.
