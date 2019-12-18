/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import { beforeEach } from 'mocha';
import app from '../app';

import {
  validUser,
  noEmailUser,
  noPasswordUser,
  noUsernameUser,
  invalidEmailUser,
  shortPasswordUser,
  createUsers,
  user1,
  generateToken,
  invalidToken,
} from './testData';

const usersUrl = '/api/v1/users';

chai.use(chaiHttp);
const { expect } = chai;

beforeEach(createUsers);

describe('Testing the User management module', () => {
  it('Should create a new user', (done) => {
    const { username, email } = validUser;
    chai.request(app).post(usersUrl).set('Accept', 'application/json').send(validUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data.user).to.include({ username, email });
        done();
      });
  });

  it('Should throw a 400 if a username already exists', (done) => {
    chai.request(app).post(usersUrl).set('Accept', 'application/json').send(user1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('Should throw a 400 if email is not provided', (done) => {
    chai.request(app).post(usersUrl).set('Accept', 'application/json').send(noEmailUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email is required.');
        done();
      });
  });

  it('Should throw a 400 if password is not provided', (done) => {
    chai.request(app).post(usersUrl).set('Accept', 'application/json').send(noPasswordUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Password is required.');
        done();
      });
  });

  it('Should throw a 400 if username is not provided', (done) => {
    chai.request(app).post(usersUrl).set('Accept', 'application/json').send(noUsernameUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Username is required.');
        done();
      });
  });

  it('Should throw a 400 if email is not valid', (done) => {
    chai.request(app).post(usersUrl).set('Accept', 'application/json').send(invalidEmailUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(`${invalidEmailUser.email} is not a valid email.`);
        done();
      });
  });

  it('Should throw a 400 if password is too short', (done) => {
    chai.request(app).post(usersUrl).set('Accept', 'application/json').send(shortPasswordUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Password should have more than 6 characters.');
        done();
      });
  });

  it('Should login a user', (done) => {
    const { username, password, email } = user1;
    const loginInfo = {
      username,
      password,
    };
    chai.request(app).post(`${usersUrl}/login`).set('Accept', 'application/json').send(loginInfo)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.user).to.include({ username, email });
        done();
      });
  });

  it('Should throw a 400 if invalid username is provided', (done) => {
    const { password } = user1;
    const loginInfo = {
      username: 'nouser',
      password,
    };
    chai.request(app).post(`${usersUrl}/login`).set('Accept', 'application/json').send(loginInfo)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.include({ status: 'error', message: 'Invalid login credentials.' });
        done();
      });
  });

  it('Should throw a 400 if invalid password is provided', (done) => {
    const { username } = user1;
    const loginInfo = {
      username,
      password: 'wrongPass12',
    };
    chai.request(app).post(`${usersUrl}/login`).set('Accept', 'application/json').send(loginInfo)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.include({ status: 'error', message: 'Invalid login credentials.' });
        done();
      });
  });

  it('Should view user profile', (done) => {
    const token = generateToken();
    const { username, email } = user1;
    chai.request(app).get(`${usersUrl}/me`).set('Authorization', `Bearer ${token}`).send()
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({ username, email });
        done();
      });
  });

  it('Should throw a 401 if authorization header is not given', (done) => {
    chai.request(app).get(`${usersUrl}/me`).send()
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.include({ status: 'error', message: 'Authorization header is required.' });
        done();
      });
  });

  it('Should throw a 401 if an invalid token was provided', (done) => {
    chai.request(app).get(`${usersUrl}/me`).set('Authorization', `Bearer ${invalidToken}`).send()
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.include({ status: 'error', message: 'Authentication failed.' });
        done();
      });
  });
});
