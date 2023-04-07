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


## Code Improvements

1. Move Server to a DDD Approach - Refactor the server code to follow a Domain-Driven Design (DDD) approach. This would involve creating necessary copies of entities, such as the Player and Guess entities, to avoid tight coupling and promote modularity;


2. Improve test coverage - Although there are currently some unit tests in the server code, it is recommended to further improve the test coverage to ensure the reliability and stability of the application;

3. Improve error handling - Enhance error handling in the server code by adding appropriate error messages and codes, and implementing appropriate error-handling mechanisms;

4. Use environment variables for configuration;

5. Implement e2e testing: Write automated tests for the server and client code to ensure that the application functions as expected;

## App Improvements

1. Prevent simultaneous guesses: To prevent the possibility of a user making two simultaneous guesses by copying their browser's localStorage value to another browser, the server-side code should be updated. Whenever the server receives a guess from a player, it should automatically resolve all pending guesses associated with that player ID.