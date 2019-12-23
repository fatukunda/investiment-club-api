import { Router } from 'express';
import userController from './userController';
import auth from '../../middleware/auth';
import { multerUploads } from '../../middleware/multer';
import { cloudinaryConfig } from '../../config/cloudinary';

const {
  createUser, loginUser, viewUserProfile, createUserProfile, uploadAvatar,
} = userController;

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', auth, viewUserProfile);
userRouter.patch('/me', auth, createUserProfile);
userRouter.patch('/me/avatar', auth, multerUploads, cloudinaryConfig, uploadAvatar);
export default userRouter;
