// src/veterinary/veterinary.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Veterinary } from './veterinary.model';

@Injectable()
export class VeterinaryService {
  private readonly veterinaries: Veterinary[] = [];

  create(veterinaryData: Veterinary): Veterinary {

    const veterinaryId = this.veterinaries.length + 1;

    const newVeterinary: Veterinary = { id: veterinaryId, ...veterinaryData };

    this.veterinaries.push(newVeterinary);

    return newVeterinary;
  }

  findAll(): Veterinary[] {
    return this.veterinaries;
  }

  findById(id: number): Veterinary {
    const veterinary = this.veterinaries.find((vet) => vet.id === id);

    if (!veterinary) {
      throw new NotFoundException(`Veterinary with ID ${id} not found`);
    }

    return veterinary;
  }

  update(id: number, updatedData: Veterinary): Veterinary {
    const index = this.veterinaries.findIndex((vet) => vet.id === id);

    if (index === -1) {
      throw new NotFoundException(`Veterinary with ID ${id} not found`);
    }

    const updatedVeterinary = { ...this.veterinaries[index], ...updatedData };
    this.veterinaries[index] = updatedVeterinary;

    return updatedVeterinary;
  }

  remove(id: number): Veterinary {
    const index = this.veterinaries.findIndex((vet) => vet.id === id);

    if (index === -1) {
      throw new NotFoundException(`Veterinary with ID ${id} not found`);
    }

    const removedVeterinary = this.veterinaries.splice(index, 1);

    return removedVeterinary[0];
  }
}
