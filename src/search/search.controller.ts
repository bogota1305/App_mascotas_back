import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { Search } from './search.model';

@Controller('searches')
@ApiTags('Búsquedas')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las búsquedas', description: 'Obtiene una lista de todas las búsquedas.' })
  @ApiResponse({ status: 200, description: 'Búsquedas obtenidas con éxito.', type: [Search] })
  @ApiNotFoundResponse({ description: 'No se encontraron búsquedas.' })
  findAll(): Search[] {
    return this.searchService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una búsqueda por ID', description: 'Obtiene una búsqueda por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Búsqueda obtenida con éxito.', type: Search })
  @ApiNotFoundResponse({ description: 'Búsqueda no encontrada.' })
  findById(@Param('id') id: number): Search {
    return this.searchService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva búsqueda', description: 'Crea una nueva búsqueda.' })
  @ApiBody({ type: Search })
  @ApiResponse({ status: 201, description: 'Búsqueda creada con éxito.', type: Search })
  @ApiBadRequestResponse({ description: 'Búsqueda incorrecta.' })
  create(@Body() searchData: Search): Search {
    return this.searchService.create(searchData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una búsqueda por ID', description: 'Actualiza una búsqueda por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiBody({ type: Search })
  @ApiResponse({ status: 200, description: 'Búsqueda actualizada con éxito.', type: Search })
  @ApiNotFoundResponse({ description: 'Búsqueda no encontrada.' })
  @ApiBadRequestResponse({ description: 'Búsqueda incorrecta.' })
  update(@Param('id') id: number, @Body() updatedData: Search): Search {
    return this.searchService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una búsqueda por ID', description: 'Elimina una búsqueda por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Búsqueda eliminada con éxito.', type: Search })
  @ApiNotFoundResponse({ description: 'Búsqueda no encontrada.' })
  remove(@Param('id') id: number): Search {
    return this.searchService.remove(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Eliminar todas las búsquedas', description: 'Elimina todas las búsquedas.' })
  removeAll(): void {
    this.searchService.removeAll();
  }
}
