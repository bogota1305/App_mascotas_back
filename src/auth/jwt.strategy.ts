import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { secretKey } from './secretKey';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey, 
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado o token inválido.');
      }

      return user;
    } catch (error) {
      console.error('Error en la validación del token:', error);
      throw new UnauthorizedException('Error en la validación del token.');
    }
  }
}
