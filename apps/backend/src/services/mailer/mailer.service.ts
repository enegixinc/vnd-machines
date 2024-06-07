import { Injectable } from '@nestjs/common';
import { MachineEntity } from '../../modules/machines/entities/machine.entity';
import { ProductEntity } from '../../modules/products/product.entity';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { MailerService as BaseMailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@backend/config';
import { TemplatesService } from './templates.service';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailService: BaseMailerService,
    private readonly configService: ConfigService,
    private readonly templatesService: TemplatesService
  ) {}

  async sendFillRequestMail(
    machine: MachineEntity,
    products: ProductEntity[],
    supplier: UserEntity,
    notes: string
  ) {
    const fillRequestTemplate = await this.templatesService.fillRequestTemplate(
      {
        supplierName: supplier.firstName,
        machineName: machine.name,
        machineLocation: machine.description,
        products: products.map((product) => ({
          name: Object.values(product.name).join(' - '),
          quantity: product.quantity,
        })),
        notes,
      }
    );

    const mailOptions = {
      from: `"VND Machines" <${this.configService.get('MAIL_USER')}>`,
      to: supplier.email,
      subject: 'New Fill Request!',
      html: fillRequestTemplate,
    };

    await this.mailService.sendMail(mailOptions);
  }
}
