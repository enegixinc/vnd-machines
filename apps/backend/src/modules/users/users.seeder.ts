import { Injectable } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { UserEntity } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class BaseSeeder implements Seeder {
  constructor(
    protected readonly repository: Repository<any>,
    protected readonly entityClass: any,
    protected readonly batchSize = 3000,
    protected readonly totalItems = 30000
  ) {}

  async seed() {
    const totalBatches = Math.ceil(this.totalItems / this.batchSize);

    for (let i = 0; i < totalBatches; i++) {
      const entities = DataFactory.createForClass(this.entityClass).generate(
        this.batchSize
      );
      entities.map((entity) => {
        const createdAt = faker.date
          .between({
            from: new Date('2015-01-01').toISOString(),
            to: new Date('2024-01-01').toISOString(),
          })
          .toISOString();

        entity.createdAt = createdAt;
        entity.updatedAt = faker.date
          .between({
            from: createdAt,
            to: new Date('2024-01-01').toISOString(),
          })
          .toISOString();
        entity.__v = 8;
        entity._id = faker.string.uuid();
      });
      try {
        await this.repository.insert(entities);
        console.log(`Batch ${i + 1} of ${totalBatches} inserted successfully`);
      } catch (error) {
        if (
          error instanceof QueryFailedError &&
          error.message.includes('duplicate key value')
        ) {
          console.count('Duplicate key violation, skipping record...');
          console.log(entities[0]);
        } else {
          throw error;
        }
      }
    }
  }

  async drop() {
    return this.repository.delete({});
  }
}

@Injectable()
export class UsersSeeder extends BaseSeeder {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    super(userRepository, UserEntity);
  }
}
