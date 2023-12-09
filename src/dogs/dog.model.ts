import { ApiProperty } from '@nestjs/swagger';

export class Dog {
    @ApiProperty({ description: 'ID del perro' })
    id: string;

    @ApiProperty({ description: 'Nombre del perro' })
    nombre: string;

    @ApiProperty({ description: 'Fecha de nacimiento del perro' })
    fechaNacimiento: Date;

    @ApiProperty({ description: 'Raza del perro' })
    raza: string;

    @ApiProperty({ description: 'Personalidad del perro' })
    personalidad: string;

    @ApiProperty({ description: 'Cuidados especiales del perro' })
    cuidadosEspeciales: string;

    @ApiProperty({ description: 'Sexo del perro' })
    sexo: string;

    @ApiProperty({ description: 'ID del dueño del perro' })
    idDueno: string;

    @ApiProperty({ description: 'Fotos del perro' })
    photos: string[];
}