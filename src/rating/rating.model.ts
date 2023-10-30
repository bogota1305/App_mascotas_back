import { ApiProperty } from '@nestjs/swagger';

export class Rating {
    @ApiProperty({ description: 'ID de la calificación' })
    id: number;

    @ApiProperty({ description: 'Puntuación de la calificación' })
    puntuacion: number;

    @ApiProperty({ description: 'Comentario de la calificación' })
    comentario: string;
}
