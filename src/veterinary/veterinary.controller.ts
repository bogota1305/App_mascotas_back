import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { VeterinaryService } from './veterinary.service';
import { Veterinary } from './veterinary.model';

@Controller('veterinaries')
@ApiTags('Veterinarias')
export class VeterinaryController {
  constructor(private readonly veterinaryService: VeterinaryService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las veterinarias', description: 'Obtiene una lista de todas las veterinarias.' })
  @ApiResponse({ status: 200, description: 'Veterinarias obtenidas con éxito.', type: [Veterinary] })
  @ApiNotFoundResponse({ description: 'No se encontraron veterinarias.' })
  findAll(): Veterinary[] {
    return this.veterinaryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una veterinaria por ID', description: 'Obtiene una veterinaria por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Veterinaria obtenida con éxito.', type: Veterinary })
  @ApiNotFoundResponse({ description: 'Veterinaria no encontrada.' })
  findById(@Param('id') id: number): Veterinary {
    return this.veterinaryService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva veterinaria', description: 'Crea una nueva veterinaria.' })
  @ApiBody({ type: Veterinary }) 
  @ApiResponse({ status: 201, description: 'Veterinaria creada con éxito.', type: Veterinary })
  @ApiBadRequestResponse({ description: 'Veterinaria incorrecta.' })
  create(@Body() veterinaryData: Veterinary): Veterinary {
    return this.veterinaryService.create(veterinaryData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una veterinaria por ID', description: 'Actualiza una veterinaria por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiBody({ type: Veterinary }) 
  @ApiResponse({ status: 200, description: 'Veterinaria actualizada con éxito.', type: Veterinary })
  @ApiNotFoundResponse({ description: 'Veterinaria no encontrada.' })
  @ApiBadRequestResponse({ description: 'Veterinaria incorrecta.' })
  update(@Param('id') id: number, @Body() updatedData: Veterinary): Veterinary {
    return this.veterinaryService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una veterinaria por ID', description: 'Elimina una veterinaria por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Veterinaria eliminada con éxito.', type: Veterinary })
  @ApiNotFoundResponse({ description: 'Veterinaria no encontrada.' })
  remove(@Param('id') id: number): Veterinary {
    return this.veterinaryService.remove(id);
  }
}
