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
});