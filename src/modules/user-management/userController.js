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
      if (error.errors.password) {
        errorMessage = error.errors.password.message;
      } else if (error.errors.email) {
        errorMessage = error.errors.email.message;
      } else if (error.errors.username) {
        errorMessage = error.errors.username.message;
      }
      util.setError(400, errorMessage);
      return util.send(res);
    }
  }
}
