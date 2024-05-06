import { Module } from '@nestjs/common';

import { UsersModule } from '../modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../modules/files/files.module';
import { ProductsModule } from '../modules/products/products.module';

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
    // HealthModule,
  ],
})
export class AppModule {}
