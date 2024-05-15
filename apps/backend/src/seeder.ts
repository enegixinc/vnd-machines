import { UsersSeeder } from './modules/users/users.seeder';
import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/users/entities/user.entity';
import { ProductEntity } from './modules/products/product.entity';
import { BrandEntity } from './modules/brands/brand.entity';
import { CategoryEntity } from './modules/categories/category.entity';
import { DatabaseEntity } from './common/database.entity';
import { ProductsSeeder } from './modules/products/products.seeder';
import { ConfigModule, ConfigService } from '@backend/config';

seeder({
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
        entities: [
          UserEntity,
          ProductEntity,
          BrandEntity,
          CategoryEntity,
          DatabaseEntity,
        ],
      }),
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity,
      BrandEntity,
      CategoryEntity,
      DatabaseEntity,
    ]),
    ConfigModule,
  ],
}).run([UsersSeeder, ProductsSeeder]);

/////
