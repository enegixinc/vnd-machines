import { Injectable, OnModuleInit } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import * as hbs from 'handlebars';
import { ProductEntity } from '../../modules/products/entities/product.entity';
import { MachineProduct } from '../../modules/machines/entities/machine-product.entity';

type FillRequestTemplateData = {
  supplierName: string;
  machineName: string;
  machineLocation: string;
  products: {
    quantity: number;
    product: ProductEntity;
  }[];
  notes: string;
  requestId: string;
};

type NearExpirationTemplateData = {
  supplierName: string;
  products: MachineProduct[];
};

export enum TEMPLATE_NAMES {
  FILL_REQUEST = 'fill-request',
  NEAR_EXPIRATION = 'near-expiration',
  LOW_STOCK = 'low-stock',
  EXPIRED_PRODUCTS = 'expired-products',
}

type TemplateProps = FillRequestTemplateData | NearExpirationTemplateData;

@Injectable()
export class TemplatesService implements OnModuleInit {
  onModuleInit() {
    console.log('TemplatesService has been initialized.');
  }

  async getTemplate(templateName: TEMPLATE_NAMES, props: TemplateProps) {
    const templatePath = path.join(
      __dirname,
      'assets',
      'templates',
      `${templateName}.hbs`
    );
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = hbs.compile(template);

    return compiledTemplate(props);
  }
}
