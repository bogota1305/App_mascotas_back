import { ApiProperty } from '@nestjs/swagger';

export class Veterinary {
    @ApiProperty({ description: 'ID de la clínica veterinaria' })
    id: number;

    @ApiProperty({ description: 'Nombre de la clínica veterinaria' })
    nombre: string;

    @ApiProperty({ description: 'Número de teléfono de la clínica veterinaria' })
    numeroTelefono: string;

    @ApiProperty({ description: 'Ubicación de la clínica veterinaria' })
    ubicacion: string;
}
