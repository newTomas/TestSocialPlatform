import { IJwtPayload } from '../interfaces/auth.interface.js';

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload; 
    }
  }
}
