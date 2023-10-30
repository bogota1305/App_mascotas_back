import { ApiProperty } from '@nestjs/swagger';
import { Localization } from "src/localization/localization.model";

export class Accommodation {
    @ApiProperty({ description: 'ID de la acomodación' })
    id: number;

    @ApiProperty({ description: 'Fotos de la acomodación', type: [String] })
    photos: string[];

    @ApiProperty({ description: 'Ubicación de la acomodación', type: Localization })
    ubicacion: Localization;

    @ApiProperty({ description: 'Descripción del espacio' })
    descripcionEspacio: string;

    @ApiProperty({ description: 'Precio por noche' })
    precioPorNoche: number;

    @ApiProperty({ description: 'Precio por hora' })
    precioPorHora: number;

    @ApiProperty({ description: 'ID del usuario propietario' })
    idUser: string;
}
