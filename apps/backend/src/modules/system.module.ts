import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { FileDto } from './files/file.dto';
import { HashingModule } from '../common/hashing/hashing.module';
import { HashingService } from '../common/hashing/hashing.service';
import { MachinesModule } from './machines/machines.module';
import { ContractsModule } from './contracts/contracts.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    AuthModule,
    MachinesModule,
    UsersModule,
    ContractsModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    FileDto,

    HashingModule,
  ],
  controllers: [],
  providers: [HashingService],
})
export class SystemModule {}
