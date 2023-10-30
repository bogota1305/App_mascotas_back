import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { LocalizationService } from './localization.service';
import { Localization } from './localization.model';

@Controller('locations')
@ApiTags('Localización')
export class LocalizationController {
  constructor(private readonly locationService: LocalizationService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las localizaciones', description: 'Obtiene una lista de todas las localizaciones.' })
  @ApiResponse({ status: 200, description: 'Localizaciones obtenidas con éxito.', type: [Localization] })
  @ApiNotFoundResponse({ description: 'No se encontraron localizaciones.' })
  findAll(): Localization[] {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una localización por ID', description: 'Obtiene una localización por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Localización obtenida con éxito.', type: Localization })
  @ApiNotFoundResponse({ description: 'Localización no encontrada.' })
  findById(@Param('id') id: number): Localization {
    return this.locationService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva localización', description: 'Crea una nueva localización.' })
  @ApiBody({ type: Localization })
  @ApiResponse({ status: 201, description: 'Localización creada con éxito.', type: Localization })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  create(@Body() locationData: Localization): Localization {
    return this.locationService.create(locationData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una localización por ID', description: 'Actualiza una localización por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiBody({ type: Localization })
  @ApiResponse({ status: 200, description: 'Localización actualizada con éxito.', type: Localization })
  @ApiNotFoundResponse({ description: 'Localización no encontrada.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  update(@Param('id') id: number, @Body() updatedData: Localization): Localization {
    return this.locationService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una localización por ID', description: 'Elimina una localización por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Localización eliminada con éxito.', type: Localization })
  @ApiNotFoundResponse({ description: 'Localización no encontrada.' })
  remove(@Param('id') id: number): Localization {
    return this.locationService.remove(id);
  }
}
