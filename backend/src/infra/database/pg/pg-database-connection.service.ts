import { DatabaseConnection } from '@/application/database/database-connection';
import { Injectable } from '@nestjs/common';
import { Pool, PoolConfig, QueryResult } from 'pg';

@Injectable()
export class PgDatabaseConnectionService implements DatabaseConnection {
  private pool: Pool;

  constructor() {
    const databaseUrl = new URL(process.env.DATABASE_URL);
    const schema = databaseUrl.searchParams.get('schema') || 'public';

    const config: PoolConfig = {
      connectionString: databaseUrl.href,
    };

    this.pool = new Pool(config);
    this.pool.on('connect', (client) => {
      client.query(`SET search_path TO '${schema}'`);
    });
  }

  async query<T>(statement: string, params?: any[]): Promise<QueryResult<T>> {
    const client = await this.pool.connect();
    try {
      return await client.query<T>(statement, params);
    } finally {
      client.release();
    }
  }
}
