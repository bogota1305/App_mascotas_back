import { ApiProperty } from '@nestjs/swagger';

export class PaymentMethod {
    @ApiProperty({ description: 'ID del método de pago' })
    id: number;

    @ApiProperty({ description: 'Tipo de método de pago' })
    tipo: string;

    @ApiProperty({ description: 'Número del método de pago' })
    numero: string;

    @ApiProperty({ description: 'Fecha de vencimiento del método de pago' })
    fechaVencimiento: string;

    @ApiProperty({ description: 'Código de seguridad (CVV) del método de pago' })
    cvv: number;

    @ApiProperty({ description: 'Propietario del método de pago' })
    propietario: string;

    @ApiProperty({ description: 'ID del usuario asociado al método de pago' })
    idUsuario: string;
}
