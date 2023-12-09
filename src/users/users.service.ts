import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.model';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async create(userData: User): Promise<User> {
    const existingUser = this.users.find((user) => user.correo === userData.correo);
    if (existingUser) {
      throw new ConflictException('El usuario con este correo ya existe.');
    }

    const userId = `${userData.pais}${userData.documento}`;

    if (this.users.some((user) => user.id === userId)) {
      throw new ConflictException('El usuario con este documento ya existe.');
    }

    userData.fotos = await this.uploadImagesToStorage(userData.fotos);
    userData.fotosDocumento = await this.uploadImagesToStorage(userData.fotosDocumento);

    const newUser: User = { id: userId, ...userData };

    this.users.push(newUser);

    return newUser;
  }

  // async uploadImagesToStorage(images: string[]): Promise<string[]> {
  //   const storage = getStorage();
  //   const uploadedUrls: string[] = [];

  //   for (const base64Image of images) {
  //     const imageName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.png`;
  //     const imagePath = `uploads/${imageName}`;
  //     const storageRef = ref(storage, imagePath);

  //     // Decodifica la imagen base64 y la guarda en el sistema de archivos
  //     const imageBuffer = Buffer.from(base64Image, 'base64');
  //     await uploadBytes(storageRef, imageBuffer);

  //     // Obtiene la URL de la imagen almacenada
  //     const downloadURL = await getDownloadURL(storageRef);
  //     uploadedUrls.push(downloadURL);
  //   }

  //   return uploadedUrls;
  // }

  private async uploadImagesToStorage(images: string[]): Promise<string[]> {
    const uploadedUrls: string[] = [];

    for (const imageUrl of images) {
      if (imageUrl.startsWith('https://firebasestorage.googleapis.com/')) {
        uploadedUrls.push(imageUrl);
      } else {
        uploadedUrls.push(await this.uploadImage(imageUrl));
      }
    }

    return uploadedUrls;
  }

  private async uploadImage(imageUrl: string): Promise<string> {
    const storage = getStorage();
    const imageName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.png`;
    const imagePath = `uploads/${imageName}`;
    const storageRef = ref(storage, imagePath);

    const imageBuffer = Buffer.from(imageUrl, 'base64');
    await uploadBytes(storageRef, imageBuffer);

    return  await getDownloadURL(storageRef);
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

  async update(id: string, updatedData: User): Promise<User> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('Usuario no encontrado');
    }

    updatedData.fotos = await this.uploadImagesToStorage(updatedData.fotos);
    updatedData.fotosDocumento = await this.uploadImagesToStorage(updatedData.fotosDocumento);

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

  async validateUser(mail: string, password: string): Promise<User> {

    const user = this.users.find((u) => u.correo === mail);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.contrasena !== password) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return user;
  }
}
