import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImagesService } from "./images.service";
import { diskStorage } from "multer";
import { renameImage } from "./helpers/images.helper";
import { Image } from './images.model';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Image> {
        if (!file) {
            throw new Error('No se ha proporcionado un archivo.');
        }
        if (!file || !file.buffer) {
            throw new Error('El archivo no tiene un buffer válido');
        }
        
        try {
            // Aquí puedes realizar cualquier lógica adicional necesaria antes de guardar la imagen en Firebase
            // Puedes acceder al contenido del archivo con file.buffer y file.originalname

            const image = await this.imagesService.create(file);
            return image;
        } catch (error) {
            console.error('Error al procesar el archivo:', error);
            throw new Error(`Error al procesar el archivo: ${error.message}`);
        }
    }
}
