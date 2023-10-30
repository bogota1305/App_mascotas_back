import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { Dog } from './dog.model';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiOperation, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Perros') // Etiqueta del grupo de rutas de Swagger
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los perros', description: 'Obtiene una lista de todos los perros.' })
  @ApiResponse({ status: 200, description: 'Perros obtenidos con éxito.', type: [Dog] })
  @ApiNotFoundResponse({ description: 'No se encontraron perros.' })
  findAll(): Dog[] {
    return this.dogsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo perro', description: 'Crea un nuevo perro.' })
  @ApiBody({ type: Dog }) 
  @ApiResponse({ status: 201, description: 'Perro creado con éxito.', type: Dog })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  create(@Body() dogData: Dog): Dog {
    return this.dogsService.create(dogData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un perro por ID', description: 'Obtiene un perro por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Perro obtenido con éxito.', type: Dog })
  @ApiNotFoundResponse({ description: 'Perro no encontrado.' })
  findById(@Param('id') id: number): Dog {
    return this.dogsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un perro por ID', description: 'Actualiza un perro por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiBody({ type: Dog }) 
  @ApiResponse({ status: 200, description: 'Perro actualizado con éxito.', type: Dog })
  @ApiNotFoundResponse({ description: 'Perro no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  update(@Param('id') id: number, @Body() updatedData: Dog): Dog {
    return this.dogsService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un perro por ID', description: 'Elimina un perro por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Perro eliminado con éxito.', type: Dog })
  @ApiNotFoundResponse({ description: 'Perro no encontrado.' })
  remove(@Param('id') id: number): Dog {
    return this.dogsService.remove(id);
  }
}
