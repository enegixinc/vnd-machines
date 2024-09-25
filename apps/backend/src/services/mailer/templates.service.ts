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

@Injectable()
export class TemplatesService implements OnModuleInit {
  onModuleInit() {
    console.log('TemplatesService has been initialized.');
  }

  async getTemplate(templateName: string, props: Record<string, any>) {
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

  async fillRequestTemplate(props: FillRequestTemplateData) {
    const templatePath = path.join(
      __dirname,
      'assets',
      'templates',
      'fill-request.hbs'
    );
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = hbs.compile(template);

    return compiledTemplate(props);
  }

  async nearExpirationTemplate(props: NearExpirationTemplateData) {
    const templatePath = path.join(
      __dirname,
      'assets',
      'templates',
      'near-expiration.hbs'
    );
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = hbs.compile(template);

    return compiledTemplate(props);
  }
}
