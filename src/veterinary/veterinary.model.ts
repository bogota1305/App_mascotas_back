import { ApiProperty } from '@nestjs/swagger';
import { Localization } from 'src/localization/localization.model';

export class Veterinary {
    @ApiProperty({ description: 'ID de la clínica veterinaria' })
    id: number;

    @ApiProperty({ description: 'Nombre de la clínica veterinaria' })
    nombre: string;

    @ApiProperty({ description: 'Número de teléfono de la clínica veterinaria' })
    numeroTelefono: string;

    @ApiProperty({ description: 'Ubicación de la veterinaria', type: Localization })
    ubicacion: Localization;
}
