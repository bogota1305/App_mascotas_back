import { Module } from '@nestjs/common';
import { VeterinaryController } from './veterinary.controller';
import { VeterinaryService } from './veterinary.service';

@Module({
  controllers: [VeterinaryController],
  providers: [VeterinaryService],
})
export class VeterinaryModule {}
