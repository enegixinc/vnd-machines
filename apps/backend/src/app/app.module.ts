import { Module } from '@nestjs/common';

import { UsersModule } from '../modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../modules/files/files.module';
import { ProductsModule } from '../modules/products/products.module';
import { BrandsModule } from '../modules/brands/brands.module';
import { CategoriesModule } from '../modules/categories/categories.module';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // configService.get('POSTGRES_HOST'), // 'localhost
      port: 5432, // configService.get('POSTGRES_PORT'), // 5432
      username: 'postgres', // configService.get('POSTGRES_USER'), // 'postgres
      password: 'postgres', // configService.get('POSTGRES_PASSWORD'), // 'password
      database: 'postgres', // configService.get('POSTGRES_DB'), // 'postgres
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    FilesModule,
    ProductsModule,
    BrandsModule,
    CategoriesModule,
    // HealthModule,
    AuthModule,
  ],
})
export class AppModule {}
