import { Injectable } from '@nestjs/common';
import { MachineEntity } from '../../modules/machines/entities/machine.entity';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { MailerService as BaseMailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@backend/config';
import { TEMPLATE_NAMES, TemplatesService } from './templates.service';
import { ProductEntity } from '../../modules/products/entities/product.entity';
import { MachineProduct } from '../../modules/machines/entities/machine-product.entity';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailService: BaseMailerService,
    private readonly configService: ConfigService,
    private readonly templatesService: TemplatesService
  ) {
    console.log('MailerService has been initialized.');
    console.log('TemplatesService has been initialized.', templatesService);
  }

  async sendLowStockProductsMail(
    supplier: UserEntity,
    products: MachineProduct[]
  ) {
    const lowStockProductsTemplate = await this.templatesService.getTemplate(
      TEMPLATE_NAMES.LOW_STOCK,
      {
        supplierName: supplier.firstName,
        products,
      }
    );

    const mailOptions = {
      from: `"VND Machines" <${this.configService.get('MAIL_USER')}>`,
      to: supplier.email,
      subject: 'Low Stock Products!',
      html: lowStockProductsTemplate,
    };

    return await this.mailService.sendMail(mailOptions);
  }

  async sendExpiredProductsMail(
    supplier: UserEntity,
    products: MachineProduct[]
  ) {
    const expiredProductsTemplate = await this.templatesService.getTemplate(
      TEMPLATE_NAMES.EXPIRED_PRODUCTS,
      {
        supplierName: supplier.firstName,
        products,
      }
    );

    const mailOptions = {
      from: `"VND Machines" <${this.configService.get('MAIL_USER')}>`,
      to: supplier.email,
      subject: 'Expired Products!',
      html: expiredProductsTemplate,
    };

    return await this.mailService.sendMail(mailOptions);
  }

  async sendNearExpirationMail(
    supplier: UserEntity,
    products: MachineProduct[]
  ) {
    const nearExpirationTemplate = await this.templatesService.getTemplate(
      TEMPLATE_NAMES.NEAR_EXPIRATION,
      {
        supplierName: supplier.firstName,
        products,
      }
    );

    const mailOptions = {
      from: `"VND Machines" <${this.configService.get('MAIL_USER')}>`,
      to: supplier.email,
      subject: 'Products Near Expiration!',
      html: nearExpirationTemplate,
    };

    return await this.mailService.sendMail(mailOptions);
  }

  async sendFillRequestMail(
    machine: MachineEntity,
    products: {
      quantity: number;
      product: ProductEntity;
    }[],
    supplier: UserEntity,
    notes: string,
    requestId: string
  ) {
    const fillRequestTemplate = await this.templatesService.getTemplate(
      TEMPLATE_NAMES.FILL_REQUEST,
      {
        supplierName: supplier.firstName,
        machineName: machine.name,
        machineLocation: machine.description,
        products,
        notes,
        requestId,
      }
    );

    const mailOptions = {
      from: `"VND Machines" <${this.configService.get('MAIL_USER')}>`,
      to: supplier.email,
      subject: 'New Fill Request!',
      html: fillRequestTemplate,
    };

    return await this.mailService.sendMail(mailOptions);
  }
}
