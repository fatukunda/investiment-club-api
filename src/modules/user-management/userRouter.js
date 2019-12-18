import { Router } from 'express';
import userController from './userController';

const { createUser, loginUser } = userController;

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
export default userRouter;
