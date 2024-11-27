import { PasswordFactory } from './password';

describe('[VO] Password', () => {
  describe('[VO] Plain password', () => {
    it('should create a valid plain password', async () => {
      const rawPassword = '123456';
      const password = PasswordFactory.create({
        password: rawPassword,
        type: 'plain',
      });

      expect(password.getValue()).toBe(rawPassword);
    });

    it('should throws an error when creating an invalid raw password', () => {
      const rawPassword = '123';

      expect(() =>
        PasswordFactory.create({ password: rawPassword, type: 'plain' }),
      ).toThrow(new Error('Password must be greater than 5 characters'));
    });

    it('verifyRawPassword should return true when passwords are equal', () => {
      const rawPassword = '123456';
      const password = PasswordFactory.create({
        password: rawPassword,
        type: 'plain',
      });

      expect(password.verifyRawPassword(rawPassword)).toBe(true);
    });

    it('verifyRawPassword should return false when passwords are not equal', () => {
      const rawPassword = '123456';
      const anotherRawPassword = '654321';
      const password = PasswordFactory.create({
        password: rawPassword,
        type: 'plain',
      });

      expect(password.verifyRawPassword(anotherRawPassword)).toBe(false);
    });
  });

  describe('[VO] Bcrypt password', () => {
    it('should create a valid bcrypt password', async () => {
      const rawPassword = '123456';
      const password = PasswordFactory.create({
        password: rawPassword,
        type: 'bcrypt',
      });

      expect(password.getValue()).toEqual(expect.any(String));
    });

    it('should throws an error when creating an invalid raw password', () => {
      const rawPassword = '123';

      expect(() =>
        PasswordFactory.create({ password: rawPassword, type: 'bcrypt' }),
      ).toThrow(new Error('Password must be greater than 5 characters'));
    });

    it('verifyRawPassword should return true when passwords are equal', () => {
      const rawPassword = '123456';
      const password = PasswordFactory.create({
        password: rawPassword,
        type: 'bcrypt',
      });

      expect(password.verifyRawPassword(rawPassword)).toBe(true);
    });

    it('verifyRawPassword should return false when passwords are not equal', () => {
      const rawPassword = '123456';
      const anotherRawPassword = '654321';
      const password = PasswordFactory.create({
        password: rawPassword,
        type: 'bcrypt',
      });

      expect(password.verifyRawPassword(anotherRawPassword)).toBe(false);
    });
  });
});
