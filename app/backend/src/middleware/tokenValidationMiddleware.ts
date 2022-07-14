import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class ValidateToken {
  static tokenValidation(req: Request, res: Response, next: NextFunction) {
    console.log('cheguei na validação de token');
    const token = req.headers.authorization as string;
    const results = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!results || results.length < 1) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    console.log('sai da validação de token');
    next();
  }
}
