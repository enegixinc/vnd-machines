import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { RequestType } from '../request.entity';

export class CreateRequestDto {
  @IsEnum(RequestType)
  requestType: RequestType;

  @IsNotEmpty()
  issuedBy: number;

  @IsNotEmpty()
  issuedTo: number;

  @IsOptional()
  notes?: string;
}

export class CreateFillRequestDto extends CreateRequestDto {
  @IsNotEmpty()
  machine: number;

  @IsNotEmpty()
  products: number[];

  @IsOptional()
  accepted?: boolean;
}
