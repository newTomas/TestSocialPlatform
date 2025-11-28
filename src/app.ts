import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.middleware.js';
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/post.routes.js';

export const createApp = () => {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use(helmet());

	app.use('/api/auth', authRouter);
	app.use('/api/posts', postRouter);

	app.use(errorMiddleware);

	return app;
};
