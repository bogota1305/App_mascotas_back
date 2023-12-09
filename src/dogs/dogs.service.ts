// src/dog/dog.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from './dog.model';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];
  

  async create(dogData: Dog): Promise<Dog> {

    dogData.photos = await this.uploadImagesToStorage(dogData.photos);
    
    const newDog: Dog = {
      id: dogData.id,
      ...dogData,
    };
    this.dogs.push(newDog);
    return newDog;
  }

  findAll(): Dog[] {
    return this.dogs;
  }

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

  findById(id: string): Dog {
    const dog = this.dogs.find((d) => d.id === id);

    if (!dog) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }

    return dog;
  }

  async update(id: string, updatedData: Dog): Promise<Dog> {
    const index = this.dogs.findIndex((d) => d.id === id);

    if (index === -1) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }

    updatedData.photos = await this.uploadImagesToStorage(updatedData.photos);

    const updatedDog = { ...this.dogs[index], ...updatedData };
    this.dogs[index] = updatedDog;

    return updatedDog;
  }

  remove(id: string): Dog {
    const index = this.dogs.findIndex((d) => d.id === id);

    if (index === -1) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }

    const removedDog = this.dogs.splice(index, 1);

    return removedDog[0];
  }
}
