import { Injectable } from '@nestjs/common';
import { DatabaseConnection } from 'src/application/database/database-connection';
import { Either, left, right } from 'src/core/either';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error';
import { QueryError } from 'src/core/errors/query-error';

interface Input {
  account: {
    id: number;
  };
}

type Output = Either<
  QueryError,
  {
    account: {
      id: number;
      name: string;
      email: string;
    };
  }
>;

@Injectable()
export class GetAuthenticatedAccountQuery {
  constructor(private database: DatabaseConnection) {}

  async handle(input: Input): Promise<Output> {
    const account = await this.database.query(
      `
      SELECT 
        id,
        name,
        email
      FROM accounts
      WHERE id = $1
    `,
      [input.account.id],
    );

    if (!account) return left(new ResourceNotFoundError());

    return right(account);
  }
}
