import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../modules/user-management/User';

// eslint-disable-next-line no-underscore-dangle
const _id = mongoose.Types.ObjectId();
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
  _id,
  username: 'user1',
  email: 'user1@app.com',
  password: 'testuser1!@',
};
const user2 = {
  username: 'user2',
  email: 'user2@app.com',
  password: 'testuser2!@',
};

export const userProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  dob: '02.17.2004',
  address: 'Ntinda, Kampala',
  gender: 'male',
  phoneNumber: '+256716565142',
};

export const invalidProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  dob: '02.17.2004',
  location: 'Ntinda, Kampala',
  gender: 'male',
  phoneNumber: '+256716565142',
};

export const invalidFirstName = {
  firstName: 34542525,
  lastName: 'Doe',
};

export const invalidLastName = {
  firstName: 'John',
  lastName: 456536356,
};

export const invalidDob = {
  firstName: 'John',
  lastName: 'Doe',
  dob: 'invalid',
};

export const invalidGender = {
  firstName: 'John',
  lastName: 'Doe',
  dob: '4.4.2000',
  gender: 'invalid',
};

export const invalidPhoneNumber = {
  firstName: 'John',
  lastName: 'Doe',
  dob: '4.4.2000',
  gender: 'male',
  phoneNumber: '8978762565652652625',
};
// Function to create users for each test

export const createUsers = async () => {
  await User.deleteMany();
  await User.create(user1);
  await User.create(user2);
};

export const generateToken = () => {
  const token = jwt.sign({ _id }, process.env.JWT_KEY, { expiresIn: '1h' });
  return token;
};

export const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGY5Y2NmODM3MDFhODUwOGM2NzZhZGYiLCJpYXQiOjE1NzY2NTg1NTcsImV4cCI6MTU3NjY2MjE1N30.Wz6xtyN9B6gXr_Y2VgbWUVOZrAljoy4V2ewhZrWXSUB';
