import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UserEntity } from '../users/entities/user.entity';
import { ProductSubscriber } from './products.subscriber';
import { ProductEntity } from './entities/product.entity';
import { ProductsCronjob } from './products.cronjob';
import { MachineProduct } from '../machines/entities/machine-product.entity';
import { ProductsMin } from '../machines/entities/products_min.entity';
import { MailerModule } from '../../services/mailer/mailer.module';
import { MailerService } from '../../services/mailer/mailer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      UserEntity,
      ProductsMin,
      MachineProduct,
    ]),
    MailerModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductSubscriber,
    ProductsCronjob,
    MailerService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
