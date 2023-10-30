// src/insurance/insurance.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Insurance } from './insurance.model';

@Injectable()
export class InsuranceService {
  private readonly insurances: Insurance[] = [];

  create(insuranceData: Insurance): Insurance {

    const insuranceId = this.insurances.length + 1;

    const newInsurance: Insurance = { id: insuranceId, ...insuranceData };

    this.insurances.push(newInsurance);

    return newInsurance;
  }

  findAll(): Insurance[] {
    return this.insurances;
  }

  findById(id: number): Insurance {
    const insurance = this.insurances.find((ins) => ins.id === id);

    if (!insurance) {
      throw new NotFoundException(`Insurance with ID ${id} not found`);
    }

    return insurance;
  }

  update(id: number, updatedData: Insurance): Insurance {
    const index = this.insurances.findIndex((ins) => ins.id === id);

    if (index === -1) {
      throw new NotFoundException(`Insurance with ID ${id} not found`);
    }

    const updatedInsurance = { ...this.insurances[index], ...updatedData };
    this.insurances[index] = updatedInsurance;

    return updatedInsurance;
  }

  remove(id: number): Insurance {
    const index = this.insurances.findIndex((ins) => ins.id === id);

    if (index === -1) {
      throw new NotFoundException(`Insurance with ID ${id} not found`);
    }

    const removedInsurance = this.insurances.splice(index, 1);

    return removedInsurance[0];
  }
}
