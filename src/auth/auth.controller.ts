import { Controller, Post, Body, UnauthorizedException, Get, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.model';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registro de usuario', description: 'Registra un nuevo usuario.' })
  @ApiBody({ type: User }) 
  @ApiResponse({ status: 201, description: 'Usuario registrado con éxito.', type: String })
  @ApiUnauthorizedResponse({ description: 'Error en la validación del token.' })
  async register(@Body() userData: User): Promise<string> {
    try {
      const token = await this.authService.register(userData);
      return token;
    } catch (error) {
      console.error('Error en el registro:', error);
      throw new UnauthorizedException('Error en el registro.');
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión', description: 'Inicia sesión con las credenciales proporcionadas.' })
  @ApiBody({ type: User }) 
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.', type: String })
  @ApiUnauthorizedResponse({ description: 'Credenciales inválidas o error en la validación del token.' })
  async login(@Body() credentials: { mail: string; password: string }): Promise<string> {
    try {
      const token = await this.authService.login(credentials.mail, credentials.password);
      return token;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw new UnauthorizedException('Credenciales inválidas o error en el inicio de sesión.');
    }
  }

  @Get('user')
  @ApiOperation({ summary: 'Obtener usuario desde token', description: 'Obtiene el usuario asociado al token proporcionado.' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido con éxito.', type: User })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  async getUserFromToken(@Req() req): Promise<User> {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      return await this.authService.getUserFromToken(token);
    } catch (error) {
      console.error('Error al obtener el usuario desde el token:', error);
      throw new UnauthorizedException('Token inválido');
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión', description: 'Revoca el token de acceso, cerrando la sesión del usuario.' })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200, description: 'Sesión cerrada con éxito.' })
  @ApiUnauthorizedResponse({ description: 'Token inválido o ya revocado.' })
  async logout(@Req() req): Promise<void> {
    const token = req.headers.authorization;
    try {
      await this.authService.logout(token);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw new UnauthorizedException('Token inválido o ya revocado');
    }
  }
}
