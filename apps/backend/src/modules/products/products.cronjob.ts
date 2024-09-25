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
    await this.notifyExpiredProducts();
    await this.notifyProductsWillExpireIn();
  }

  private async notifyExpiredProducts(): Promise<void> {
    const expiredProducts = await this.productService.findExpiredProducts();

    const supplierProductsMap = this.groupProductsBySupplier(expiredProducts);

    for (const [_, { supplier, products }] of supplierProductsMap) {
      await this.mailerService.sendExpiredProductsMail(supplier, products);
    }
  }

  private async notifyProductsWillExpireIn(): Promise<void> {
    const today = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(today.getDate() + 3);

    const expiringProducts =
      await this.productService.findProductsWillExpireBetween(
        today,
        expirationDate
      );

    const supplierProductsMap = this.groupProductsBySupplier(expiringProducts);

    for (const [_, { supplier, products }] of supplierProductsMap) {
      await this.mailerService.sendNearExpirationMail(supplier, products);
    }
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
