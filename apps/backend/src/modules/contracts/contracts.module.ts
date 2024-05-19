import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './entities/contract.entity';
import { ContractsController } from './contracts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity])],
  controllers: [ContractsController],
})
export class ContractsModule {}
