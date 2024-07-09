import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailerService } from '../../../services/mailer/mailer.service';
import { FillRequestEntity, FillRequestProducts } from './fill-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineEntity } from '../../machines/entities/machine.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { OnModuleInit } from '@nestjs/common';
import { QUEUES } from '../../../common/constants';

@Processor(QUEUES.REQUESTS)
export class RequestsProcessor extends WorkerHost implements OnModuleInit {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(FillRequestEntity)
    private readonly requestsRepository: Repository<FillRequestEntity>
  ) {
    super();
  }

  onModuleInit() {
    console.log('Processor initialized');
  }

  async process(job: Job<FillRequestEntity>): Promise<void> {
    const { machine: rawMachine, products: rawProducts, notes } = job.data;
    console.log('Processing job', job.data);
    try {
      const machine = await this.getMachineData(rawMachine._id);
      const productsData = await this.getProductsData(rawProducts);
      const suppliersMap = this.groupProductsBySupplier(productsData);

      for (const [supplier, products] of suppliersMap.entries()) {
        await this.mailerService.sendFillRequestMail(
          machine,
          products,
          supplier,
          notes,
          job.data._id
        );
      }
    } catch (error) {
      console.error('Error processing job', error);
      throw error;
    }
  }

  private async getMachineData(machineId: string): Promise<MachineEntity> {
    return await this.requestsRepository.manager.findOne(MachineEntity, {
      where: { _id: machineId },
    });
  }

  private async getProductsData(products: FillRequestProducts[]) {
    const productIds = products.map((product) => product.product._id);
    const productsDetails = await this.requestsRepository.manager.find(
      ProductEntity,
      {
        where: productIds.map((_id) => ({ _id })),
        relations: ['supplier'],
      }
    );

    return products.map((product) => ({
      product: productsDetails.find((p) => p._id === product.product._id),
      quantity: product.quantity,
    }));
  }

  private groupProductsBySupplier(
    fillRequestProducts: { product: ProductEntity; quantity: number }[]
  ): Map<UserEntity, { product: ProductEntity; quantity: number }[]> {
    console.log('Grouping products by supplier', fillRequestProducts);
    const suppliersMap = new Map<
      UserEntity,
      { product: ProductEntity; quantity: number }[]
    >();

    for (const { product, quantity } of fillRequestProducts) {
      const supplierId = product.supplier._id;
      const supplier = [...suppliersMap.keys()].find(
        (s) => s._id === supplierId
      );

      if (supplier) {
        suppliersMap.get(supplier).push({ product, quantity });
      } else {
        suppliersMap.set(product.supplier, [{ product, quantity }]);
      }
    }

    return suppliersMap;
  }
  @OnWorkerEvent('completed')
  async onCompleted(job: Job<FillRequestEntity>): Promise<void> {
    console.log('Processing completed');
    // await this.requestsRepository.update(job.data._id, {
    //   receivedMail: true,
    // });
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error): void {
    console.error(`Job failed: ${job.id}`, err);
  }
}
