import express from 'express';
import config from 'dotenv';
import cors from 'cors';
import userRouter from './modules/user-management/userRouter';

config.config();
require('./database');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Investiment club portal' });
});

export default app;
