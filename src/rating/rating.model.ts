import { ApiProperty } from '@nestjs/swagger';

export class Rating {
    @ApiProperty({ description: 'ID de la calificación' })
    id: number;

    @ApiProperty({ description: 'Puntuación de la calificación' })
    puntuacion: number;

    @ApiProperty({ description: 'Comentario de la calificación' })
    comentario: string;

    @ApiProperty({ description: 'ID del usuario que crea la calificación' })
    idUsuarioCreador: string;

    @ApiProperty({ description: 'ID del usuario que recibe la calificación' })
    idUsuarioReceptor: string;
}

