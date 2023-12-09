import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { RequestService } from './request.service';
import { Request } from './request.model';

@Controller('requests')
@ApiTags('Solicitudes')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las solicitudes', description: 'Obtiene una lista de todas las solicitudes.' })
  @ApiResponse({ status: 200, description: 'Solicitudes obtenidas con éxito.', type: [Request] })
  @ApiNotFoundResponse({ description: 'No se encontraron solicitudes.' })
  findAll(): Request[] {
    return this.requestService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una solicitud por ID', description: 'Obtiene una solicitud por su ID.' })
  @ApiParam({ name: 'id', type: String }) 
  @ApiResponse({ status: 200, description: 'Solicitud obtenida con éxito.', type: Request })
  @ApiNotFoundResponse({ description: 'Solicitud no encontrada.' })
  findById(@Param('id') id: string): Request {
    return this.requestService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva solicitud', description: 'Crea una nueva solicitud.' })
  @ApiBody({ type: Request })
  @ApiResponse({ status: 201, description: 'Solicitud creada con éxito.', type: Request })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  create(@Body() requestData: Request): Request {
    return this.requestService.create(requestData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una solicitud por ID', description: 'Actualiza una solicitud por su ID.' })
  @ApiParam({ name: 'id', type: String }) 
  @ApiBody({ type: Request })
  @ApiResponse({ status: 200, description: 'Solicitud actualizada con éxito.', type: Request })
  @ApiNotFoundResponse({ description: 'Solicitud no encontrada.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  update(@Param('id') id: string, @Body() updatedData: Request): Request {
    return this.requestService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una solicitud por ID', description: 'Elimina una solicitud por su ID.' })
  @ApiParam({ name: 'id', type: String }) 
  @ApiResponse({ status: 200, description: 'Solicitud eliminada con éxito.', type: Request })
  @ApiNotFoundResponse({ description: 'Solicitud no encontrada.' })
  remove(@Param('id') id: string): Request {
    return this.requestService.remove(id);
  }
}
