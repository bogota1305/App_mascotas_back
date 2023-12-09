import { ApiProperty } from '@nestjs/swagger';

export class Request {
    @ApiProperty({ description: 'ID de la solicitud' })
    id: string;

    @ApiProperty({ description: 'Estado de la solicitud' })
    estado: string;

    @ApiProperty({ description: 'ID del usuario solicitante' })
    idUsuarioSolicitante: string;

    @ApiProperty({ description: 'ID del usuario solicitado' })
    idUsuarioSolicitado: string;

    @ApiProperty({ description: 'Tipo de servicio' })
    tipoDeServicio: string;

    @ApiProperty({ description: 'Fecha de inicio del servicio' })
    fechaDeInicio: Date;

    @ApiProperty({ description: 'Fecha de fin del servicio' })
    fechaDeFin: Date;

    @ApiProperty({ description: 'Hora de inicio del servicio' })
    horaDeInicio: number;

    @ApiProperty({ description: 'Hora de fin del servicio' })
    horaDeFin: number;

    @ApiProperty({ description: 'ID del perro o los perros' })
    idPerros: string[];

    @ApiProperty({ description: 'ID del alojamiento' })
    idAlojamiento: string;

    @ApiProperty({ description: 'Precio del servicio' })
    precio: number;
}

