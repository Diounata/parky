export abstract class DatabaseConnection {
  abstract query(statement: string, params?: any): Promise<Array<any>>;
}
