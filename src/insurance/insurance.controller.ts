import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { InsuranceService } from './insurance.service';
import { Insurance } from './insurance.model';

@Controller('insurances')
@ApiTags('Seguros')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los seguros', description: 'Obtiene una lista de todos los seguros.' })
  @ApiResponse({ status: 200, description: 'Seguros obtenidos con éxito.', type: [Insurance] })
  @ApiNotFoundResponse({ description: 'No se encontraron seguros.' })
  findAll(): Insurance[] {
    return this.insuranceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un seguro por ID', description: 'Obtiene un seguro por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Seguro obtenido con éxito.', type: Insurance })
  @ApiNotFoundResponse({ description: 'Seguro no encontrado.' })
  findById(@Param('id') id: number): Insurance {
    return this.insuranceService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo seguro', description: 'Crea un nuevo seguro.' })
  @ApiBody({ type: Insurance }) 
  @ApiResponse({ status: 201, description: 'Seguro creado con éxito.', type: Insurance })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  create(@Body() insuranceData: Insurance): Insurance {
    return this.insuranceService.create(insuranceData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un seguro por ID', description: 'Actualiza un seguro por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiBody({ type: Insurance }) 
  @ApiResponse({ status: 200, description: 'Seguro actualizado con éxito.', type: Insurance })
  @ApiNotFoundResponse({ description: 'Seguro no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  update(@Param('id') id: number, @Body() updatedData: Insurance): Insurance {
    return this.insuranceService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un seguro por ID', description: 'Elimina un seguro por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Seguro eliminado con éxito.', type: Insurance })
  @ApiNotFoundResponse({ description: 'Seguro no encontrado.' })
  remove(@Param('id') id: number): Insurance {
    return this.insuranceService.remove(id);
  }
}
