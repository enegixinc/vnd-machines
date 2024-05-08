import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@backend/config';

import { UsersModule } from '../modules/users/users.module';
import { FilesModule } from '../modules/files/files.module';
import { ProductsModule } from '../modules/products/products.module';
import { BrandsModule } from '../modules/brands/brands.module';
import { CategoriesModule } from '../modules/categories/categories.module';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: parseInt(configService.get('POSTGRES_PORT'), 10),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
      }),
    }),
    UsersModule,
    FilesModule,
    ProductsModule,
    BrandsModule,
    CategoriesModule,
    ConfigModule,
    // HealthModule,
    AuthModule,
  ],
})
export class AppModule {}
