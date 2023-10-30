import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(userData: User): User {
    const existingUser = this.users.find((user) => user.correo === userData.correo);
    if (existingUser) {
      throw new ConflictException('El usuario con este correo ya existe.');
    }

    const userId = `${userData.pais}${userData.documento}`;

    if (this.users.some((user) => user.id === userId)) {
      throw new ConflictException('El usuario con este ID ya existe.');
    }

    const newUser: User = { id: userId, ...userData };

    this.users.push(newUser);

    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  update(id: string, updatedData: User): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('Usuario no encontrado');
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updatedData };
    return this.users[userIndex];
  }

  remove(id: string): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const removedUser = this.users.splice(userIndex, 1)[0];
    return removedUser;
  }

  findAllCuidadores(): User[] {
    return this.users.filter((user) => user.tipo === 'Cuidador');
  }
}
