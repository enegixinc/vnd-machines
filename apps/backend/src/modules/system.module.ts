import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { HashingModule } from '../common/hashing/hashing.module';
import { HashingService } from '../common/hashing/hashing.service';
import { MachinesModule } from './machines/machines.module';
import { ContractsModule } from './contracts/contracts.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { RequestsModule } from './requests/fill-requests/requests.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    AuthModule,
    MachinesModule,
    RequestsModule,
    UsersModule,
    ContractsModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    OrdersModule,
    FilesModule,
    HashingModule,
  ],
  controllers: [],
  providers: [HashingService],
})
export class SystemModule {}
