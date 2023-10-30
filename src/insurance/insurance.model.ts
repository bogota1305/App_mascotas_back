import { ApiProperty } from '@nestjs/swagger';

export class Insurance {
    @ApiProperty({ description: 'ID del seguro' })
    id: number;

    @ApiProperty({ description: 'Compañía de seguros' })
    compania: string;

    @ApiProperty({ description: 'Precio del seguro' })
    precio: number;

    @ApiProperty({ description: 'Contrato de seguro' })
    contrato: string;
}
