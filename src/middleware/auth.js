/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import User from '../modules/user-management/User';
import Util from '../utils/utils';

const util = new Util();
// eslint-disable-next-line consistent-return
const auth = async (req, res, next) => {
  if (!req.header('Authorization')) {
    util.setError(401, 'Authorization header is required.');
    return util.send(res);
  }
  const token = req.header('Authorization').replace('Bearer ', '');
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err !== null && err.name === 'TokenExpiredError') {
      util.setError(401, 'Your session has expired. Please login again!');
      return util.send(res);
    }
    if (err !== null && err.name === 'JsonWebTokenError') {
      util.setError(401, 'Authentication failed.');
      return util.send(res);
    }
    const user = await User.findOne({ _id: decoded._id }).exec();
    req.user = user;
    next();
  });
};

export default auth;
