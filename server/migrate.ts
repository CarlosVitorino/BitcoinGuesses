// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./@types/dynamodb-migrations/index.ts" />

import * as AWS from 'aws-sdk'
import * as dm from 'dynamodb-migrations'
import path = require('path')

// Load AWS credentials and configure the SDK
AWS.config.loadFromPath('./config/aws-config.json')

// Create a DynamoDB client
const dynamodb = {
  raw: new AWS.DynamoDB(),
  doc: new AWS.DynamoDB.DocumentClient()
}

// Initialize the migrations module with the DynamoDB client
const relPath = 'migrations'
const absolutePath = path.dirname(__filename) + '/' + relPath
dm.init(dynamodb, absolutePath)

// Execute the migrations for each table
async function migrateTables (): Promise<void> {
  try {
    await dm.execute('players', { prefix: '', suffix: '' })
    await dm.execute('guesses', { prefix: '', suffix: '' })
  } catch (error) {
    console.error('Error migrating tables: ', error)
  }
}

// Call the migrateTables function to execute the migrations
void migrateTables()
