import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './entities/contract.entity';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { ContractsSubscriber } from './contracts.subscriber';
import { PaymentsEntity } from '../payments/payments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractEntity]),
    TypeOrmModule.forFeature([PaymentsEntity]),
  ],
  controllers: [ContractsController],
  providers: [ContractsService, ContractsSubscriber],
})
export class ContractsModule {}
