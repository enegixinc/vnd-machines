// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { MachineEntity } from './entities/machine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRequest } from '@dataui/crud';
import { UserRole } from '@core';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class MachinesService extends TypeOrmCrudService<MachineEntity> {
  constructor(
    @InjectRepository(MachineEntity) repository: Repository<MachineEntity>
  ) {
    super(repository);
  }

  private isSupplier(req: CrudRequest) {
    const user = req.auth as UserEntity;
    return user.role === UserRole.SUPPLIER;
  }

  private assignComputedFields(machine: MachineEntity) {
    const totalSales = machine.product.reduce(
      (acc, product) => acc + product.product.totalSales,
      0
    );
    const totalOrders = machine.product.reduce(
      (acc, product) => acc + product.product.totalOrders,
      0
    );
    const totalRevenue = machine.product.reduce(
      (acc, product) => acc + product.product.totalRevenue,
      0
    );
    const totalActiveRevenue = machine.product.reduce(
      (acc, product) => acc + product.product.totalActiveRevenue,
      0
    );
    const totalSoldProducts = machine.product.reduce(
      (acc, product) => acc + product.product.totalSoldProducts,
      0
    );
    const totalMaxStock = machine.product.reduce(
      (acc, product) => acc + product.max_stock,
      0
    );
    const stock = machine.product.reduce(
      (acc, product) => acc + product.current_stock,
      0
    );
    const fill = totalMaxStock - stock;

    Object.assign(machine, {
      totalSales,
      totalOrders,
      totalRevenue,
      totalActiveRevenue,
      totalSoldProducts,
      totalMaxStock,
      stock,
      fill,
    });
  }

  async getOne(req: CrudRequest) {
    const response = await super.getOne(req);
    if (this.isSupplier(req)) this.assignComputedFields(response);

    return response;
  }

  async getMany(req: CrudRequest) {
    const response = await super.getMany(req);

    if (this.isSupplier(req)) {
      // @ts-expect-error - type
      for (const machine of response.data) this.assignComputedFields(machine);
    }

    return response;
  }
}
