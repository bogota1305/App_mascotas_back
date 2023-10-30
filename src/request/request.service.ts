// src/request/request.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from './request.model';

@Injectable()
export class RequestService {
  private readonly requests: Request[] = [];

  create(requestData: Request): Request {
    // Asigna un ID único a la solicitud (esto puede variar según tu implementación)
    const requestId = this.requests.length + 1;

    // Crea una nueva solicitud con un ID único y los datos proporcionados
    const newRequest: Request = { id: requestId, ...requestData };

    // Agrega la nueva solicitud a la lista de solicitudes
    this.requests.push(newRequest);

    return newRequest;
  }

  findAll(): Request[] {
    return this.requests;
  }

  findById(id: number): Request {
    const request = this.requests.find((req) => req.id === id);

    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }

    return request;
  }

  update(id: number, updatedData: Request): Request {
    const index = this.requests.findIndex((req) => req.id === id);

    if (index === -1) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }

    const updatedRequest = { ...this.requests[index], ...updatedData };
    this.requests[index] = updatedRequest;

    return updatedRequest;
  }

  remove(id: number): Request {
    const index = this.requests.findIndex((req) => req.id === id);

    if (index === -1) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }

    const removedRequest = this.requests.splice(index, 1);

    return removedRequest[0];
  }
  // Implementa otros métodos según las necesidades de tu aplicación.
}
