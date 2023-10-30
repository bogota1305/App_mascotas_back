import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Accommodation } from './accommodation.model';

@Injectable()
export class AccommodationsService {
  private readonly accommodations: Accommodation[] = [];

  create(accommodationData: Accommodation): Accommodation {
    
    const accommodationId = this.accommodations.length + 1;

    const newAccommodation: Accommodation = { id: accommodationId, ...accommodationData };

    this.accommodations.push(newAccommodation);

    return newAccommodation;
  }

  findAll(): Accommodation[] {
    return this.accommodations;
  }

  findById(id: number): Accommodation {
    const accommodation = this.accommodations.find((a) => a.id === id);
    if (!accommodation) {
      throw new NotFoundException('Alojamiento no encontrado');
    }
    return accommodation;
  }

  update(id: number, updatedData: Accommodation): Accommodation {
    const accommodationIndex = this.accommodations.findIndex((a) => a.id === id);
    if (accommodationIndex === -1) {
      throw new NotFoundException('Alojamiento no encontrado');
    }

    this.accommodations[accommodationIndex] = { ...this.accommodations[accommodationIndex], ...updatedData };
    return this.accommodations[accommodationIndex];
  }

  remove(id: number): Accommodation {
    const accommodationIndex = this.accommodations.findIndex((a) => a.id === id);
    if (accommodationIndex === -1) {
      throw new NotFoundException('Alojamiento no encontrado');
    }

    const removedAccommodation = this.accommodations.splice(accommodationIndex, 1)[0];
    return removedAccommodation;
  }
}
