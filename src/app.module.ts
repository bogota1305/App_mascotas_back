import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { setupSwagger } from 'swagger';
import { InsuranceModule } from './insurance/insurance.module';
import { RatingModule } from './rating/rating.module';
import { RequestModule } from './request/request.module';
import { VeterinaryModule } from './veterinary/veterinary.module';

@Module({
  imports: [DogsModule, AccommodationsModule, BankAccountModule, LocalizationModule, PaymentMethodModule, UsersModule, InsuranceModule, RatingModule, RequestModule, VeterinaryModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(UsersController);
  }
}
