import { DatabaseConnection } from '@/application/database/database-connection';
import { AccountNotFoundError } from '@/application/use-cases/accounts/errors/account-not-found';
import { Either, left, right } from '@/core/either';
import { QueryError } from '@/core/errors/query-error';
import { Injectable } from '@nestjs/common';

interface Input {
  accountId: string;
}

type Output = Either<
  QueryError,
  {
    account: {
      id: string;
      name: string;
      email: string;
    };
  }
>;

@Injectable()
export class GetAuthenticatedAccountQuery {
  constructor(private database: DatabaseConnection) {}

  async handle(input: Input): Promise<Output> {
    const response = await this.database.query(
      `
      SELECT 
        id,
        name,
        email
      FROM accounts
      WHERE id = $1
    `,
      [input.accountId],
    );

    if (!response) {
      return left(new AccountNotFoundError({ id: input.accountId }));
    }

    return right({ account: response.rows[0] });
  }
}
