import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod } from './payment-method.model';

@Controller('payment-methods')
@ApiTags('Métodos de Pago')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los métodos de pago', description: 'Obtiene una lista de todos los métodos de pago.' })
  @ApiResponse({ status: 200, description: 'Métodos de pago obtenidos con éxito.', type: [PaymentMethod] })
  @ApiNotFoundResponse({ description: 'No se encontraron métodos de pago.' })
  findAll(): PaymentMethod[] {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un método de pago por ID', description: 'Obtiene un método de pago por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Método de pago obtenido con éxito.', type: PaymentMethod })
  @ApiNotFoundResponse({ description: 'Método de pago no encontrado.' })
  findById(@Param('id') id: number): PaymentMethod {
    return this.paymentMethodService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo método de pago', description: 'Crea un nuevo método de pago.' })
  @ApiBody({ type: PaymentMethod })
  @ApiResponse({ status: 201, description: 'Método de pago creado con éxito.', type: PaymentMethod })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  create(@Body() paymentMethodData: PaymentMethod): PaymentMethod {
    return this.paymentMethodService.create(paymentMethodData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un método de pago por ID', description: 'Actualiza un método de pago por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiBody({ type: PaymentMethod })
  @ApiResponse({ status: 200, description: 'Método de pago actualizado con éxito.', type: PaymentMethod })
  @ApiNotFoundResponse({ description: 'Método de pago no encontrado.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  update(@Param('id') id: number, @Body() updatedData: PaymentMethod): PaymentMethod {
    return this.paymentMethodService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un método de pago por ID', description: 'Elimina un método de pago por su ID.' })
  @ApiParam({ name: 'id', type: Number }) 
  @ApiResponse({ status: 200, description: 'Método de pago eliminado con éxito.', type: PaymentMethod })
  @ApiNotFoundResponse({ description: 'Método de pago no encontrado.' })
  remove(@Param('id') id: number): PaymentMethod {
    return this.paymentMethodService.remove(id);
  }
}
