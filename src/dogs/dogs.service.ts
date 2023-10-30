// src/dog/dog.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from './dog.model';

@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];

  create(dogData: Dog): Dog {
    const newDog: Dog = {
      id: this.dogs.length + 1,
      ...dogData,
    };
    this.dogs.push(newDog);
    return newDog;
  }

  findAll(): Dog[] {
    return this.dogs;
  }

  findById(id: number): Dog {
    const dog = this.dogs.find((d) => d.id === id);

    if (!dog) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }

    return dog;
  }

  update(id: number, updatedData: Dog): Dog {
    const index = this.dogs.findIndex((d) => d.id === id);

    if (index === -1) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }

    const updatedDog = { ...this.dogs[index], ...updatedData };
    this.dogs[index] = updatedDog;

    return updatedDog;
  }

  remove(id: number): Dog {
    const index = this.dogs.findIndex((d) => d.id === id);

    if (index === -1) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }

    const removedDog = this.dogs.splice(index, 1);

    return removedDog[0];
  }
}
