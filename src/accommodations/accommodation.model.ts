import { ApiProperty } from '@nestjs/swagger';
import { Localization } from "src/localization/localization.model";

export class Accommodation {
    @ApiProperty({ description: 'ID de la acomodación' })
    id: string;

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

    @ApiProperty({ description: 'Tipo de servicio' })
    tipoDeServicio: string;

    @ApiProperty({ description: 'Día inicio de disponibilidad', type: Date })
    diaInicioDisponibilidad: Date;

    @ApiProperty({ description: 'Día fin de disponibilidad', type: Date })
    diaFinDisponibilidad: Date;

    @ApiProperty({ description: 'Hora inicio de disponibilidad' })
    horaInicioDisponibilidad: number;

    @ApiProperty({ description: 'Hora fin de disponibilidad' })
    horaFinDisponibilidad: number;
}
