import { Timestamp } from '../value-objects/timestamp';
import { Account } from './account';

describe('[Entity] Account', () => {
  it('should create a valid account', () => {
    const props = {
      id: 'account-id',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      passwordType: 'bcrypt',
    };

    const account = new Account(props);

    expect(account.getId()).toBe(props.id);
    expect(account.getName()).toBe(props.name);
    expect(account.getEmail()).toBe(props.email);
    expect(account.getPasswordValue()).toBeTruthy();
    expect(account.getPasswordType()).toBe(props.passwordType);
    expect(account.verifyRawPassword(props.password)).toBe(true);
    expect(account.getTimestamp()).toBeInstanceOf(Timestamp);
  });
});
