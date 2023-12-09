// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { AccommodationsModule } from './accommodations/accommodations.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { LocalizationModule } from './localization/localization.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { setupSwagger } from 'swagger';
import { InsuranceModule } from './insurance/insurance.module';
import { RatingModule } from './rating/rating.module';
import { RequestModule } from './request/request.module';
import { VeterinaryModule } from './veterinary/veterinary.module';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    DogsModule,
    AccommodationsModule,
    BankAccountModule,
    LocalizationModule,
    PaymentMethodModule,
    UsersModule,
    InsuranceModule,
    RatingModule,
    RequestModule,
    VeterinaryModule,
    SearchModule,
    PassportModule,
    AuthModule,
    ImagesModule
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, AuthService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(AuthController); 
  }
}
