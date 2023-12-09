import { ApiProperty } from '@nestjs/swagger';
import { Accommodation } from "src/accommodations/accommodation.model";
import { BankAccount } from "src/bank-account/bank-account.model";
import { Dog } from "src/dogs/dog.model";
import { Insurance } from "src/insurance/insurance.model";
import { PaymentMethod } from "src/payment-method/payment-method.model";
import { Rating } from "src/rating/rating.model";
import { Veterinary } from "src/veterinary/veterinary.model";

export class User {
  @ApiProperty({ description: 'ID del usuario' })
  id: string;

  @ApiProperty({ description: 'Nombre del usuario' })
  nombre: string;

  @ApiProperty({ description: 'Apellidos del usuario' })
  apellidos: string;

  @ApiProperty({ description: 'Fotos del usuario' })
  fotos: string[];

  @ApiProperty({ description: 'Descripción del usuario' })
  descripcion: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  contrasena: string;

  @ApiProperty({ description: 'Fecha de nacimiento del usuario' })
  fechaNacimiento: Date;

  @ApiProperty({ description: 'Correo del usuario' })
  correo: string;

  @ApiProperty({ description: 'Tipo de usuario' })
  tipo: string;

  @ApiProperty({ description: 'Sexo del usuario' })
  sexo: string;

  @ApiProperty({ description: 'Prefijo de teléfono del usuario' })
  prefijoTelefono: string;

  @ApiProperty({ description: 'Número de teléfono del usuario' })
  telefono: string;

  @ApiProperty({ description: 'Tipo de documento del usuario' })
  tipoDocumento: string;

  @ApiProperty({ description: 'Número de documento del usuario' })
  documento: string;

  @ApiProperty({ type: () => Dog, isArray: true, description: 'Perros del usuario' })
  perros: Dog[];

  @ApiProperty({ description: 'País del usuario' })
  pais: string;

  @ApiProperty({ description: 'Fotos del documento del usuario' })
  fotosDocumento: string[];

  @ApiProperty({ type: () => Accommodation, description: 'Alojamiento del usuario' })
  alojamiento: Accommodation;

  // @ApiProperty({ type: () => PaymentMethod, isArray: true, description: 'Métodos de pago del usuario' })
  // metodosDePago: PaymentMethod[];

  // @ApiProperty({ type: () => BankAccount, description: 'Cuenta bancaria del usuario' })
  // cuentaBancaria: BankAccount;

  @ApiProperty({ type: () => Rating, isArray: true, description: 'Calificaciones del usuario' })
  calificaciones: Rating[];

  @ApiProperty({ description: 'Calificación promedio del usuario' })
  calificacionPromedio: number;

  @ApiProperty({ description: 'Solicitudes creadas por el usuario' })
  solicitudesCreadas: Request[];

  @ApiProperty({ description: 'Solicitudes recibidas por el usuario' })
  solicitudesRecibidas: Request[];

  @ApiProperty({ type: () => Veterinary, description: 'Clínica veterinaria del usuario' })
  clinicaVeterinaria: Veterinary;

  @ApiProperty({ type: () => User, isArray: true, description: 'Id cuidadores favoritos' })
  cuidadoresFavoritos: string[];

  // @ApiProperty({ type: () => Insurance, description: 'Seguro del usuario' })
  // seguro: Insurance;

  // @ApiProperty({ description: 'Preferencias de razas para alojar' })
  // preferenciasDeRazasAlojar: [];

  // @ApiProperty({ description: 'Perros no alojados' })
  // perrosNoAlojados: [];
}
  

