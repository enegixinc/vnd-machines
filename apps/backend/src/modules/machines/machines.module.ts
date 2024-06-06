import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { ProductExistsValidator } from '../products/validators/product-exists';
import { UserExistsValidator } from '../users/validators/user-exists';
import { ProductHasSupplier } from '../products/validators/product-has-supplier';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineEntity } from './entities/machine.entity';
import { MachinesSubscriber } from './machines.subscriber';
import { MachineProduct } from './entities/machine-product.entity';
import { Tz } from './entities/tz.entity';
import { ThemeColor } from './entities/themeColor.entity';
import { ProductsMin } from './entities/products_min.entity';
import { Language } from './entities/language.entity';
import { Currency } from './entities/currency.entity';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    TypeOrmModule.forFeature([
      MachineEntity,
      MachineProduct,
      Tz,
      ThemeColor,
      ProductsMin,
      Language,
      Currency,
    ]),
  ],
  controllers: [MachinesController],
  providers: [
    MachinesService,
    ProductExistsValidator,
    ProductHasSupplier,
    UserExistsValidator,
    MachinesSubscriber,
  ],
})
export class MachinesModule {}
