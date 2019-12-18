import { Router } from 'express';
import userController from './userController';
import auth from '../../middleware/auth';

const { createUser, loginUser, viewUserProfile } = userController;

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', auth, viewUserProfile);
export default userRouter;
