import { UsersSeeder } from './modules/users/users.seeder';
import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/users/entities/user.entity';
import { ProductEntity } from './modules/products/product.entity';
import { BrandEntity } from './modules/brands/brand.entity';
import { CategoryEntity } from './modules/categories/category.entity';
import { DatabaseEntity } from './common/database.entity';

seeder({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
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
    ]),
  ],
}).run([UsersSeeder]);
