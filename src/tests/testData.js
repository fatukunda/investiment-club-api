import User from '../modules/user-management/User';
// Valid User
export const validUser = {
  username: 'testUser',
  email: 'testuser@app.com',
  password: 'test12!@',
};

export const existingUserName = {
  username: 'testUser',
  email: 'testuser1@app.com',
  password: 'test12!@',
};

// User with no username

export const noUsernameUser = {
  email: 'testuser@app.com',
  password: 'test12!@',
};

// User with no password

export const noPasswordUser = {
  username: 'testUser',
  email: 'testuser@app.com',
};

// User with no email

export const noEmailUser = {
  username: 'testUser',
  password: 'test12!@',
};

// User with invalid email

export const invalidEmailUser = {
  username: 'testUser',
  email: 'testuserapp.com',
  password: 'test12!@',
};

// User with a short password

export const shortPasswordUser = {
  username: 'testUser',
  email: 'testuser@app.com',
  password: 'test',
};

// Sample users
export const user1 = {
  username: 'user1',
  email: 'user1@app.com',
  password: 'testuser1!@',
};
const user2 = {
  username: 'user2',
  email: 'user2@app.com',
  password: 'testuser2!@',
};
// Function to create users for each test

export const createUsers = async () => {
  await User.deleteMany();
  await User.create(user1);
  await User.create(user2);
};
