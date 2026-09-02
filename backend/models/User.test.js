const bcrypt = require('bcryptjs');
const User = require('./User');

describe('comparePassword', () => {
  test('returns true when candidate password matches the hashed password', async () => {
    
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'anything', 
    });

   
    const hashedPassword = await bcrypt.hash('mypassword123', 10);
    user.password = hashedPassword;

    const result = await user.comparePassword('mypassword123');
    expect(result).toBe(true);
  });

  test('returns false when candidate password does not match', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'anything',
    });

    const hashedPassword = await bcrypt.hash('mypassword123', 10);
    user.password = hashedPassword;

    const result = await user.comparePassword('wrongpassword');
    expect(result).toBe(false);
  });
});