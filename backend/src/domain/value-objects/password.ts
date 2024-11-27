import { compareSync, hashSync } from 'bcrypt';

export interface Password {
  getValue(): string;
  getType(): string;
  verifyRawPassword(rawPassword: string): boolean;
}

class PlainPassword implements Password {
  private value: string;
  private type: string;

  constructor(value: string, type: string) {
    if (value.length < 6) {
      throw new Error('Password must be greater than 5 characters');
    }
    this.value = value;
    this.type = type;
  }

  getValue() {
    return this.value;
  }

  getType(): string {
    return this.type;
  }

  verifyRawPassword(rawPassword: string): boolean {
    return rawPassword === this.value;
  }
}

class BcryptPassword implements Password {
  private value: string;
  private type: string;
  private readonly salt = 6;

  constructor(value: string, type: string) {
    if (value.length < 6) {
      throw new Error('Password must be greater than 5 characters');
    }
    this.value = hashSync(value, this.salt);
    this.type = type;
  }

  getValue() {
    return this.value;
  }

  getType(): string {
    return this.type;
  }

  verifyRawPassword(rawPassword: string): boolean {
    return compareSync(rawPassword, this.value);
  }
}

export class PasswordFactory {
  static create({
    password,
    type,
  }: {
    password: string;
    type: string;
  }): Password {
    if (type === 'plain') return new PlainPassword(password, type);
    if (type === 'bcrypt') return new BcryptPassword(password, type);
    throw new Error('Invalid type');
  }
}
