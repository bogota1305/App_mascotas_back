import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Accommodation } from './accommodation.model';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable()
export class AccommodationsService {
  private readonly accommodations: Accommodation[] = [];

  async create(accommodationData: Accommodation): Promise<Accommodation> {
    
    const accommodationId = accommodationData.id ?? this.accommodations.length + 1;

    accommodationData.photos = await this.uploadImagesToStorage(accommodationData.photos);

    const newAccommodation: Accommodation = { id: accommodationId, ...accommodationData };

    this.accommodations.push(newAccommodation);

    return newAccommodation;
  }

  findAll(): Accommodation[] {
    return this.accommodations;
  }

  findById(id: string): Accommodation {
    const accommodation = this.accommodations.find((a) => a.id === id);
    if (!accommodation) {
      throw new NotFoundException('Alojamiento no encontrado');
    }
    return accommodation;
  }

  async update(id: string, updatedData: Accommodation): Promise<Accommodation> {
    const accommodationIndex = this.accommodations.findIndex((a) => a.id === id);
    if (accommodationIndex === -1) {
      throw new NotFoundException('Alojamiento no encontrado');
    }

    updatedData.photos = await this.uploadImagesToStorage(updatedData.photos);

    this.accommodations[accommodationIndex] = { ...this.accommodations[accommodationIndex], ...updatedData };
    return this.accommodations[accommodationIndex];
  }

  remove(id: string): Accommodation {
    const accommodationIndex = this.accommodations.findIndex((a) => a.id === id);
    if (accommodationIndex === -1) {
      throw new NotFoundException('Alojamiento no encontrado');
    }

    const removedAccommodation = this.accommodations.splice(accommodationIndex, 1)[0];
    return removedAccommodation;
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
}
