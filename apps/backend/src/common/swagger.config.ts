import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

export default function initSwagger(
  app: NestExpressApplication
  // systemConfig: SystemConfig
) {
  const apiDocsConfig = new DocumentBuilder()
    .setTitle('TN Critic API')
    .setDescription('APIs for TN Shit')
    .setVersion('1.0.0')
    .addBearerAuth()

    .build();

  SwaggerModule.setup(
    `docs`,
    app,
    SwaggerModule.createDocument(app, apiDocsConfig),
    {
      customSiteTitle: 'TN Stuff API',
      yamlDocumentUrl: `/docs/yaml`,
    }
  );
}
