import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AccommodationsService } from './accommodations.service';
import { Accommodation } from './accommodation.model';

@Controller('accommodations')
@ApiTags('Alojamientos')
export class AccommodationsController {
  constructor(private readonly accommodationsService: AccommodationsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los alojamientos', description: 'Obtiene una lista de todos los alojamientos.' })
  @ApiResponse({ status: 200, description: 'Alojamientos obtenidos con éxito.', type: [Accommodation] })
  @ApiNotFoundResponse({ description: 'No se encontraron alojamientos.' })
  findAll(): Accommodation[] {
    return this.accommodationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un alojamiento por ID', description: 'Obtiene un alojamiento por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Alojamiento obtenido con éxito.', type: Accommodation })
  @ApiNotFoundResponse({ description: 'Alojamiento no encontrado.' })
  findById(@Param('id') id: number): Accommodation {
    return this.accommodationsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo alojamiento', description: 'Crea un nuevo alojamiento.' })
  @ApiBody({ type: Accommodation }) 
  @ApiResponse({ status: 201, description: 'Alojamiento creado con éxito.', type: Accommodation })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  create(@Body() accommodationData: Accommodation): Accommodation {
    return this.accommodationsService.create(accommodationData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un alojamiento por ID', description: 'Actualiza un alojamiento por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiBody({ type: Accommodation }) 
  @ApiResponse({ status: 200, description: 'Alojamiento actualizado con éxito.', type: Accommodation })
  @ApiNotFoundResponse({ description: 'Alojamiento no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  update(@Param('id') id: number, @Body() updatedData: Accommodation): Accommodation {
    return this.accommodationsService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un alojamiento por ID', description: 'Elimina un alojamiento por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Alojamiento eliminado con éxito.', type: Accommodation })
  @ApiNotFoundResponse({ description: 'Alojamiento no encontrado.' })
  remove(@Param('id') id: number): Accommodation {
    return this.accommodationsService.remove(id);
  }
}
