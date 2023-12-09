import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import * as nodemailer from 'nodemailer';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  private readonly revokedTokens: Set<string> = new Set();

  async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, mail: user.correo };
    return this.jwtService.sign(payload);
  }

  async register(userData: User): Promise<string> {
    const newUser = await this.userService.create(userData);

    //await this.sendConfirmationEmail(newUser);

    return 'Cuenta creada con exito'
  }

  private async sendConfirmationEmail(user: User): Promise<void> {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jdbogotaes@gmail.com',
          pass: 'Bogota1305',
        },
      });
    
    const mailOptions = {
      from: 'jdbogotaes@gmail.com',
      to: user.correo,
      subject: 'Confirmación de registro',
      text: `¡Bienvenido, ${user.nombre}! Tu cuenta ha sido creada exitosamente.`,
    };

    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);
  }

  async login(mail: string, password: string): Promise<string> {
    const user = await this.userService.validateUser(mail, password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.generateToken(user);
  }

  async getUserFromToken(token: string): Promise<User> {
    try {
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.sub;
      const user = await this.userService.findById(userId);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  async logout(token: string): Promise<void> {
    try {
  
      if (this.revokedTokens.has(token)) {
        throw new UnauthorizedException('El token ya ha sido revocado');
      }
  
      this.jwtService.verify(token);
  
      this.revokedTokens.add(token);
  
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
