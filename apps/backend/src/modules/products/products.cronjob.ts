import { ConfigService } from '@backend/config';
import { ProductsService } from './products.service';
import { MailerService } from '../../services/mailer/mailer.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { MachineProduct } from '../machines/entities/machine-product.entity';

@Injectable()
export class ProductsCronjob {
  constructor(
    @Inject(ProductsService)
    private readonly productService: ProductsService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    await Promise.all([
      this.notifyLowStockProducts(),
      this.notifyExpiredProducts(),
      this.notifyProductsWillExpireIn(),
    ]);
  }

  private async notifyLowStockProducts(): Promise<Promise<void>[]> {
    const lowStockProducts = await this.productService.findLowStockProducts();
    console.log('lowStockProducts', lowStockProducts);
    const supplierProductsMap = this.groupProductsBySupplier(lowStockProducts);
    return this.generatePromisesAndSend(
      supplierProductsMap,
      this.mailerService.sendLowStockProductsMail.bind(this.mailerService)
    );
  }

  private async notifyExpiredProducts(): Promise<Promise<void>[]> {
    const expiredProducts = await this.productService.findExpiredProducts();
    const supplierProductsMap = this.groupProductsBySupplier(expiredProducts);
    return this.generatePromisesAndSend(
      supplierProductsMap,
      this.mailerService.sendExpiredProductsMail.bind(this.mailerService)
    );
  }

  private async notifyProductsWillExpireIn(): Promise<Promise<void>[]> {
    const today = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(today.getDate() + 3);

    const expiringProducts =
      await this.productService.findProductsWillExpireBetween(
        today,
        expirationDate
      );

    const supplierProductsMap = this.groupProductsBySupplier(expiringProducts);

    return this.generatePromisesAndSend(
      supplierProductsMap,
      this.mailerService.sendNearExpirationMail.bind(this.mailerService)
    );
  }

  private groupProductsBySupplier(
    products: MachineProduct[]
  ): Map<string, { supplier: UserEntity; products: MachineProduct[] }> {
    const suppliersMap = new Map<
      string,
      { supplier: UserEntity; products: MachineProduct[] }
    >();

    products.forEach((product) => {
      const supplier = product.product.supplier;
      if (!supplier) return;

      const formattedProduct = this.formatExpirationDate(product);

      const supplierId = supplier._id;
      if (suppliersMap.has(supplierId)) {
        suppliersMap.get(supplierId)?.products.push(formattedProduct);
      } else {
        suppliersMap.set(supplierId, {
          supplier,
          products: [formattedProduct],
        });
      }
    });

    return suppliersMap;
  }

  private generatePromisesAndSend(
    supplierProductsMap: Map<
      string,
      { supplier: UserEntity; products: MachineProduct[] }
    >,
    sendMailFn: (
      supplier: UserEntity,
      products: MachineProduct[]
    ) => Promise<void>
  ): Promise<Promise<void>[]> {
    const promises = [];
    for (const [_, { supplier, products }] of supplierProductsMap) {
      promises.push(sendMailFn(supplier, products));
    }
    return Promise.all(promises);
  }

  private formatExpirationDate(machineProduct: MachineProduct) {
    const expirationDate = new Date(
      machineProduct.expiration_date
    ).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return Object.assign(machineProduct, { expiration_date: expirationDate });
  }
}
