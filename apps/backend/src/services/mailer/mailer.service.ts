import { Injectable } from '@nestjs/common';
import { MachineEntity } from '../../modules/machines/entities/machine.entity';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { MailerService as BaseMailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@backend/config';
import { TemplatesService } from './templates.service';
import { ProductEntity } from '../../modules/products/entities/product.entity';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailService: BaseMailerService,
    private readonly configService: ConfigService,
    private readonly templatesService: TemplatesService
  ) {}

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
    console.log('Sending fill request email to', supplier.email);
    const fillRequestTemplate = await this.templatesService.fillRequestTemplate(
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
