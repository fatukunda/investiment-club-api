import express from 'express';
import config from 'dotenv';
import cors from 'cors';
import('./database');

config.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send({ message: 'Welcome to the Investiment club portal' });
});

export default app;
