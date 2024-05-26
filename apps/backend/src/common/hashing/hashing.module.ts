import { Global, Module } from '@nestjs/common';
import { HashingService } from './hashing.service';

@Module({
  imports: [],
  controllers: [],
  providers: [HashingService],
})
@Global()
export class HashingModule {}
