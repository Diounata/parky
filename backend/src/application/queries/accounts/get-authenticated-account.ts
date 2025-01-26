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
    const queryData = await this.database.query(
      /* SQL */ `
      SELECT 
        id,
        name,
        email,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM accounts
      WHERE id = $1
    `,
      [input.accountId],
    );

    if (!queryData) {
      return left(new AccountNotFoundError({ id: input.accountId }));
    }

    return right({ account: queryData[0] });
  }
}
