import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { Rating } from './rating.model';

@Controller('ratings')
@ApiTags('Calificaciones')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las calificaciones', description: 'Obtiene una lista de todas las calificaciones.' })
  @ApiResponse({ status: 200, description: 'Calificaciones obtenidas con éxito.', type: [Rating] })
  @ApiNotFoundResponse({ description: 'No se encontraron calificaciones.' })
  findAll(): Rating[] {
    return this.ratingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una calificación por ID', description: 'Obtiene una calificación por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Calificación obtenida con éxito.', type: Rating })
  @ApiNotFoundResponse({ description: 'Calificación no encontrada.' })
  findById(@Param('id') id: number): Rating {
    return this.ratingService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva calificación', description: 'Crea una nueva calificación.' })
  @ApiBody({ type: Rating })
  @ApiResponse({ status: 201, description: 'Calificación creada con éxito.', type: Rating })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  create(@Body() ratingData: Rating): Rating {
    return this.ratingService.create(ratingData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una calificación por ID', description: 'Actualiza una calificación por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiBody({ type: Rating })
  @ApiResponse({ status: 200, description: 'Calificación actualizada con éxito.', type: Rating })
  @ApiNotFoundResponse({ description: 'Calificación no encontrada.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  update(@Param('id') id: number, @Body() updatedData: Rating): Rating {
    return this.ratingService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una calificación por ID', description: 'Elimina una calificación por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Calificación eliminada con éxito.', type: Rating })
  @ApiNotFoundResponse({ description: 'Calificación no encontrada.' })
  remove(@Param('id') id: number): Rating {
    return this.ratingService.remove(id);
  }
}
