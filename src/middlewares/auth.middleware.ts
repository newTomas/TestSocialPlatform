import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.utils.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Authorization token is missing or malformed.' });
	}

	const token = authHeader.split(' ')[1]!;

	try {
		req.user = verifyAccessToken(token);

		next();
	} catch (error) {
		// Токен недействителен, истек или имеет неверную подпись
		return res.status(401).json({ message: 'Invalid or expired access token.' });
	}
};
