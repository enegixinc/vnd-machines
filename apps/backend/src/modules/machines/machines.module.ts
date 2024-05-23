import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { ProductExistsValidator } from '../products/validators/product-exists';
import { UserExistsValidator } from '../users/validators/user-exists';
import { ProductHasSupplier } from '../products/validators/product-has-supplier';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [MachinesController],
  providers: [
    MachinesService,
    ProductExistsValidator,
    ProductHasSupplier,
    UserExistsValidator,
  ],
})
export class MachinesModule {}
