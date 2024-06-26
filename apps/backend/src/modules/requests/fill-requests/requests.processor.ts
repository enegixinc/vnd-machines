import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailerService } from '../../../services/mailer/mailer.service';
import { FillRequestEntity, FillRequestProducts } from './fill-request.entity';

@Processor('requests')
export class RequestsProcessor extends WorkerHost {
  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process({ data }: Job<FillRequestEntity>) {
    try {
      const { machine, products, notes } = data;

      const suppliersMap = new Map<string, FillRequestProducts[]>();

      for (const product of products) {
        const supplier = product.product.supplier;
        if (!suppliersMap.has(supplier._id)) {
          suppliersMap.set(supplier._id, []);
        }
        suppliersMap.get(supplier._id).push(product);
      }

      return suppliersMap.forEach(async (fillRequestProducts, supplierId) => {
        const supplier = fillRequestProducts[0].product.supplier;
        const products = fillRequestProducts.map((product) => ({
          quantity: product.quantity,
          product: product.product,
        }));

        return this.mailerService.sendFillRequestMail(
          machine,
          products,
          supplier,
          notes
        );
      });
    } catch (error) {
      console.error('Error processing job', error);
      throw error;
    }
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    console.log('Processing completed');
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`Job failed: ${job.id}`, err);
  }
}
