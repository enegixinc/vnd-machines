import { BaseSeeder } from '../users/users.seeder';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoriesSeeder extends BaseSeeder {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repo: Repository<CategoryEntity>
  ) {
    super(repo, CategoryEntity, 1000, 1000);
  }
}
