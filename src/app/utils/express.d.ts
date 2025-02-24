// src/express.d.ts (or any name you prefer)
import { JwtPayload } from 'jsonwebtoken';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Attach 'user' property to Request
    }
  }
}
