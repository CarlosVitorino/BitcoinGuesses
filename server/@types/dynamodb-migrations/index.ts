declare module 'dynamodb-migrations' {
  interface DynamoDBClient {
    raw: AWS.DynamoDB
    doc: AWS.DynamoDB.DocumentClient
  }

  interface MigrationOptions {
    prefix?: string
    suffix?: string
    log?: boolean
  }

  interface MigrationError extends Error {
    migration: string
    table: string
  }

  function init (dynamodb: DynamoDBClient, directory: string): void

  function create (tableName: string, options?: MigrationOptions): void

  function execute (tableName: string, options?: MigrationOptions): Promise<void>

  function listExecuted (tableName: string, options?: MigrationOptions): Promise<string[]>

  function listAll (tableName: string, options?: MigrationOptions): Promise<string[]>
}
