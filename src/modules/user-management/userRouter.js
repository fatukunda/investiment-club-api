import { Router } from 'express';
import userController from './userController';

const { createUser } = userController;

const userRouter = Router();

userRouter.post('/', createUser);

export default userRouter;
