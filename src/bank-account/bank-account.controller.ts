import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { BankAccountService } from './bank-account.service';
import { BankAccount } from './bank-account.model';

@Controller('bank-accounts')
@ApiTags('Cuentas Bancarias')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las cuentas bancarias', description: 'Obtiene una lista de todas las cuentas bancarias.' })
  @ApiResponse({ status: 200, description: 'Cuentas bancarias obtenidas con éxito.', type: [BankAccount] })
  @ApiNotFoundResponse({ description: 'No se encontraron cuentas bancarias.' })
  findAll(): BankAccount[] {
    return this.bankAccountService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cuenta bancaria por ID', description: 'Obtiene una cuenta bancaria por su ID.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cuenta bancaria obtenida con éxito.', type: BankAccount })
  @ApiNotFoundResponse({ description: 'Cuenta bancaria no encontrada.' })
  findById(@Param('id') id: number): BankAccount {
    return this.bankAccountService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cuenta bancaria', description: 'Crea una nueva cuenta bancaria.' })
  @ApiBody({ type: BankAccount }) 
  @ApiResponse({ status: 201, description: 'Cuenta bancaria creada con éxito.', type: BankAccount })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  create(@Body() bankAccountData: BankAccount): BankAccount {
    return this.bankAccountService.create(bankAccountData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una cuenta bancaria por ID', description: 'Actualiza una cuenta bancaria por su ID.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: BankAccount }) 
  @ApiResponse({ status: 200, description: 'Cuenta bancaria actualizada con éxito.', type: BankAccount })
  @ApiNotFoundResponse({ description: 'Cuenta bancaria no encontrada.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  update(@Param('id') id: number, @Body() updatedData: BankAccount): BankAccount {
    return this.bankAccountService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una cuenta bancaria por ID', description: 'Elimina una cuenta bancaria por su ID.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cuenta bancaria eliminada con éxito.', type: BankAccount })
  @ApiNotFoundResponse({ description: 'Cuenta bancaria no encontrada.' })
  remove(@Param('id') id: number): BankAccount {
    return this.bankAccountService.remove(id);
  }
}
