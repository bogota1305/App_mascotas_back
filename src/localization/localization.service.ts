import { Injectable, NotFoundException } from '@nestjs/common';
import { Localization } from './localization.model';

@Injectable()
export class LocalizationService {
  private readonly locations: Localization[] = [];

  create(locationData: Localization): Localization {

    const locationId = this.locations.length + 1;

    const newLocation: Localization = { id: locationId, ...locationData };

    this.locations.push(newLocation);

    return newLocation;
  }

  findAll(): Localization[] {
    return this.locations;
  }

  findById(id: number): Localization {
    const location = this.locations.find((loc) => loc.id === id);

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }

  update(id: number, updatedData: Localization): Localization {
    const index = this.locations.findIndex((loc) => loc.id === id);

    if (index === -1) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    const updatedLocation = { ...this.locations[index], ...updatedData };
    this.locations[index] = updatedLocation;

    return updatedLocation;
  }

  remove(id: number): Localization {
    const index = this.locations.findIndex((loc) => loc.id === id);

    if (index === -1) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    const removedLocation = this.locations[index];
    this.locations.splice(index, 1);

    return removedLocation;
  }
}
