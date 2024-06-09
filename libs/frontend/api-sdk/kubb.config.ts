// eslint-disable-next-line @nx/enforce-module-boundaries
import { defineConfig } from '@kubb/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { pluginTanstackQuery } from '@kubb/swagger-tanstack-query';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { pluginOas } from '@kubb/plugin-oas';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { pluginTs } from '@kubb/swagger-ts';

export default defineConfig({
  root: '.',
  input: {
    // path: 'libs/frontend/api-sdk/openapi-spec.json',
    path: 'https://staging-vnd-api.5ostudios.com/-json',
  },
  output: {
    path: 'libs/frontend/api-sdk/gen2',
    clean: true,
  },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginTanstackQuery({
      output: {
        path: './hooks',
      },
      group: {
        type: 'tag',
      },
      framework: 'vue',
      client: {
        importPath: '../../../src/tanstack-query-client',
      },
    }),
  ],
});
