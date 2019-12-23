import { Router } from 'express';
import userController from './userController';
import auth from '../../middleware/auth';

const {
  createUser, loginUser, viewUserProfile, createUserProfile,
} = userController;

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', auth, viewUserProfile);
userRouter.patch('/me', auth, createUserProfile);
export default userRouter;
