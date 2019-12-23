/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import Util from '../../utils/utils';
import userService from './userService';
import { profileValidator, userRegistrationValidator } from '../../utils/validator';
import { dataUri } from '../../middleware/multer';
import { uploader } from '../../config/cloudinary';

const util = new Util();

export default class UserController {
  static async createUser(req, res) {
    const userInfo = req.body;
    try {
      const createdUser = await userService.createUser(userInfo);
      util.setSuccess(201, 'User created!', createdUser);
      return util.send(res);
    } catch (error) {
      const errorMessage = userRegistrationValidator(error);
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

  static async viewUserProfile(req, res) {
    const user = await req.user;
    util.setSuccess(200, 'User Profile', user);
    return util.send(res);
  }

  static async createUserProfile(req, res) {
    const profileInfo = req.body;
    const { user } = req;
    const acceptedEditOptions = ['firstName', 'lastName', 'dob', 'gender', 'phoneNumber', 'address'];
    const receivedOptions = Object.keys(profileInfo);
    const isUpdateOption = receivedOptions.every((option) => acceptedEditOptions.includes(option));
    if (!isUpdateOption) {
      util.setError(400, 'One of the fields is not a valid update field.');
      return util.send(res);
    }
    try {
      // eslint-disable-next-line no-return-assign
      receivedOptions.forEach((option) => (user[option] = profileInfo[option]));
      await user.save();
      util.setSuccess(200, 'User profile updated successfully!', user);
      return util.send(res);
    } catch (error) {
      const errorMessage = profileValidator(error);
      util.setError(400, errorMessage);
      return util.send(res);
    }
  }

  static async uploadAvatar(req, res) {
    if (req.file) {
      const file = dataUri(req).content;
      try {
        const result = await uploader.upload(file);
        const avatarUrl = result.url;
        const userAvatar = await userService.uploadAvatar(req.user._id, avatarUrl);
        util.setSuccess(200, 'Profile picture uploaded successfully!', { avatar: userAvatar });
        return util.send(res);
      } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
      }
    }
  }
}
