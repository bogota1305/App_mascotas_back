import { ApiProperty } from '@nestjs/swagger';

export class BankAccount {
    @ApiProperty({ description: 'ID de la cuenta bancaria' })
    id: number;

    @ApiProperty({ description: 'Banco al que pertenece la cuenta' })
    banco: string;

    @ApiProperty({ description: 'Número de cuenta bancaria' })
    numeroCuenta: string;

    @ApiProperty({ description: 'Tipo de cuenta bancaria' })
    tipoCuenta: string;

    @ApiProperty({ description: 'Nombre del propietario de la cuenta' })
    propietario: string;

    @ApiProperty({ description: 'ID del usuario propietario de la cuenta' })
    idUsuario: string;
}