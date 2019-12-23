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

  /**
     * @param  {object} loginInfo
     * @returns {Promise}
     * @description Takes in username and password and returns a user and the auth token.
     */
  static async loginUser(loginInfo) {
    const { username, password } = loginInfo;
    try {
      const user = await User.findByCredentials(username, password);
      if (user.error) {
        return user;
      }
      const token = await user.generateAuthToken();
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line consistent-return
  static async uploadAvatar(userId, avatarUrl) {
    try {
      const user = await User.findById(userId);
      if (user) {
        user.avatar = avatarUrl;
        await user.save();
        return user.avatar;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
