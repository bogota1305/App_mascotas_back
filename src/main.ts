import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'swagger';
import { initializeApp } from 'firebase/app';
import { json } from 'body-parser';

async function bootstrap() {
  const firebaseConfig = {
    apiKey: "AIzaSyCW7oQvJj05PXKlLMoZ_3QJHiFSfavbC4c",
    authDomain: "appmacostas-398916.firebaseapp.com",
    projectId: "appmacostas-398916",
    storageBucket: "appmacostas-398916.appspot.com",
    messagingSenderId: "750578396020",
    appId: "1:750578396020:web:f7d3adc2724238c4ce5a21",
    measurementId: "G-QZLMTK6M1C"
  };

  initializeApp(firebaseConfig);  
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' })); 
  setupSwagger(app); 
  await app.listen(3000);
}
bootstrap();
