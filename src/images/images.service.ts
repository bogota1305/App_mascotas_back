import { Injectable, NotFoundException } from '@nestjs/common';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Image } from './images.model';

@Injectable()
export class ImagesService {
    private readonly images: Image[] = [];

    async create(file: Express.Multer.File): Promise<Image> {
        console.log(file);
        const storage = getStorage();
        var originalName = file.originalname;
        const storageRef = ref(storage, 'uploads/' + originalName);
        await uploadBytes(storageRef, file.buffer);

        const downloadURL = await getDownloadURL(storageRef);

        const newImage: Image = { filename: file.filename, url: downloadURL };
        this.images.push(newImage);

        return newImage;
    }

    findAll(): Image[] {
        return this.images;
    }
}