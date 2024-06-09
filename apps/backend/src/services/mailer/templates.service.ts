import { Injectable, OnModuleInit } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import * as hbs from 'handlebars';

type FillRequestTemplateData = {
  supplierName: string;
  machineName: string;
  machineLocation: string;
  products: { name: string; quantity: number }[];
  notes: string;
};

@Injectable()
export class TemplatesService implements OnModuleInit {
  onModuleInit() {
    console.log('TemplatesService has been initialized.');
  }

  async fillRequestTemplate(props: FillRequestTemplateData) {
    const templatePath = path.join(__dirname, 'templates', 'fill-request.hbs');
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = hbs.compile(template);

    return compiledTemplate(props);
  }
}
