import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
@ApiTags('Usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios', description: 'Obtiene una lista de todos los usuarios.' })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos con éxito.', type: [User] })
  @ApiNotFoundResponse({ description: 'No se encontraron usuarios.' })
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID', description: 'Obtiene un usuario por su ID.' })
  @ApiParam({ name: 'id', type: String }) 
  @ApiResponse({ status: 200, description: 'Usuario obtenido con éxito.', type: User })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  findById(@Param('id') id: string): User {
    return this.usersService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario', description: 'Crea un nuevo usuario.' })
  @ApiBody({ type: User }) 
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito.', type: User })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  create(@Body() userData: User): User {
    return this.usersService.create(userData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID', description: 'Actualiza un usuario por su ID.' })
  @ApiParam({ name: 'id', type: String }) 
  @ApiBody({ type: User }) 
  @ApiResponse({ status: 200, description: 'Usuario actualizado con éxito.', type: User })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  update(@Param('id') id: string, @Body() updatedData: User): User {
    return this.usersService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID', description: 'Elimina un usuario por su ID.' })
  @ApiParam({ name: 'id', type: String }) 
  @ApiResponse({ status: 200, description: 'Usuario eliminado con éxito.', type: User })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  remove(@Param('id') id: string): User {
    return this.usersService.remove(id);
  }

  @Get('cuidadores')
  @ApiOperation({ summary: 'Obtener todos los cuidadores', description: 'Obtiene una lista de todos los cuidadores.' })
  @ApiResponse({ status: 200, description: 'Cuidadores obtenidos con éxito.', type: [User] })
  @ApiNotFoundResponse({ description: 'No se encontraron cuidadores.' })
  findAllCuidadores(): User[] {
    return this.usersService.findAllCuidadores();
  }
}
