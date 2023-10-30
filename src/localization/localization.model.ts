import { ApiProperty } from '@nestjs/swagger';

export class Localization {
    @ApiProperty({ description: 'ID de la localización' })
    id: number;

    @ApiProperty({ description: 'Ciudad de la localización' })
    ciudad: string;

    @ApiProperty({ description: 'Dirección de la localización' })
    direccion: string;

    @ApiProperty({ description: 'Indicaciones Especiales de la localización' })
    indicacionesEspeciales: string;
}
