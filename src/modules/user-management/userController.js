/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import Util from '../../utils/utils';
import userService from './userService';

const util = new Util();

export default class UserController {
  static async createUser(req, res) {
    const userInfo = req.body;
    try {
      const createdUser = await userService.createUser(userInfo);
      util.setSuccess(201, 'User created!', createdUser);
      return util.send(res);
    } catch (error) {
      let errorMessage = '';
      if (error.errors.email) {
        errorMessage = error.errors.email.message;
      }
      if (error.errors.email && error.errors.email.kind === 'unique') {
        errorMessage = error.errors.email.message;
      }
      if (error.errors.email && error.errors.email.kind === 'required') {
        errorMessage = error.errors.email.message;
      }
      if (error.errors.password) {
        errorMessage = error.errors.password.message;
      }
      if (error.errors.username && error.errors.username.kind === 'unique') {
        errorMessage = error.errors.username.message;
      }
      if (error.errors.username && error.errors.username.kind === 'required') {
        errorMessage = error.errors.username.message;
      }
      util.setError(400, errorMessage);
      return util.send(res);
    }
  }

  static async loginUser(req, res) {
    const loginInfo = req.body;

    const user = await userService.loginUser(loginInfo);
    if (user.error) {
      util.setError(400, user.error);
      return util.send(res);
    }
    util.setSuccess(200, 'Logged in successfully!', user);
    return util.send(res);
  }
}
