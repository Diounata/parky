import { v4 as uuid } from 'uuid';
import { Email } from '../value-objects/email';
import { Password, PasswordFactory } from '../value-objects/password';
import { Timestamp } from '../value-objects/timestamp';

export interface AccountProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  passwordType: string;
  timestamp?: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export class Account {
  private readonly id: string;
  private name: string;
  private email: Email;
  private password: Password;
  private timestamp: Timestamp;

  constructor({
    id,
    name,
    email,
    password,
    passwordType,
    timestamp,
  }: AccountProps) {
    this.id = id ?? uuid();
    this.name = name;
    this.email = new Email(email);
    this.password = PasswordFactory.create({
      password,
      type: passwordType,
    });
    this.timestamp = new Timestamp(timestamp?.createdAt, timestamp?.updatedAt);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email.getValue();
  }

  getPasswordValue() {
    return this.password.getValue();
  }

  getPasswordType() {
    return this.password.getType();
  }

  verifyRawPassword(password: string) {
    return this.password.verifyRawPassword(password);
  }

  getTimestamp() {
    return this.timestamp;
  }
}
