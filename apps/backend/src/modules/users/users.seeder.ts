import { Injectable } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { UserEntity } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
      try {
        await this.repository.insert(entities);
        console.log(`Batch ${i + 1} of ${totalBatches} inserted successfully`);
      } catch (error) {
        if (
          error instanceof QueryFailedError &&
          error.message.includes('duplicate key value')
        ) {
          console.count('Duplicate key violation, skipping record...');
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
