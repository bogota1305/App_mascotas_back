import { ApiProperty } from '@nestjs/swagger';

export class Search {
  @ApiProperty({ description: 'ID de la busqueda' })
  id: number;

  @ApiProperty({ description: 'Tipo de servicio' })
  tipoDeServicio: string;

  @ApiProperty({ description: 'Fecha de inicio del servicio', type: Date })
  fechaDeInicio: Date;

  @ApiProperty({ description: 'Fecha de fin del servicio', type: Date })
  fechaDeFin: Date;

  @ApiProperty({ description: 'Hora de inicio del servicio' })
  horaDeInicio: number;

  @ApiProperty({ description: 'Hora de fin del servicio' })
  horaDeFin: number;

  @ApiProperty({ description: 'Ordenamiento', required: false })
  ordenamiento?: string;
}
