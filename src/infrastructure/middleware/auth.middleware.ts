import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';
// import { UnauthorizedException } from '../../shared/exceptions/unauthorized.exception';
import { appConfig } from '@config/app.config';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    roles: string[];
  };
}

@injectable()
export class AuthMiddleware {
  verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const token = this.extractTokenFromHeader(req);
      if (!token) {
        // throw new UnauthorizedException('No token provided'); // TODO: need to create and use custom exceptions
        throw new Error('No token provided');
      }

      const decoded = jwt.verify(token, appConfig.jwt.secret) as {
        userId: string;
        roles: string[];
      };

      req.user = {
        id: decoded.userId,
        roles: decoded.roles
      };

      next();
    } catch (error) {
      // throw new UnauthorizedException('Invalid token'); // TODO: need to create and use custom exceptions
      throw new Error('Invalid token');
    }
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}