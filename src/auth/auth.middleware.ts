import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { secretKey } from './secretKey';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization;

    if (!token) {
      return next();
    }

    try {
      const decodedToken = verify(token, secretKey);

      req.user = decodedToken;

      next();
    } catch (error) {
      console.error('Error en la verificación del token:', error);
      throw new UnauthorizedException('Token inválido');
    }
  }
}
