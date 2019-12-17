/* eslint-disable no-useless-catch */
import User from './User';

class UserService {
  /**
     * @param  {object} userInfo
     * @returns {Promise}
     * @description Creates a new user and user token and returns both
     */
  static async createUser(userInfo) {
    try {
      const user = new User(userInfo);
      await user.save();
      const token = await user.generateAuthToken();
      return { user, token };
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
