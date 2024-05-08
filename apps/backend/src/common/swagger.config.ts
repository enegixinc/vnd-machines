import { ApiOperation } from '@nestjs/swagger';

export const saneOperationsId = {
  getOneBase: {
    decorators: [
      ApiOperation({
        operationId: 'getOne',
      }),
    ],
  },
  createOneBase: {
    decorators: [
      ApiOperation({
        operationId: 'createOne',
      }),
    ],
  },
  updateOneBase: {
    decorators: [
      ApiOperation({
        operationId: 'updateOne',
      }),
    ],
  },
  deleteOneBase: {
    decorators: [
      ApiOperation({
        operationId: 'deleteOne',
      }),
    ],
  },
  getManyBase: {
    decorators: [
      ApiOperation({
        operationId: 'getMany',
      }),
    ],
  },
  createManyBase: {
    decorators: [
      ApiOperation({
        operationId: 'createMany',
      }),
    ],
  },
  replaceOneBase: {
    decorators: [
      ApiOperation({
        operationId: 'replaceOne',
      }),
    ],
  },
  recoverOneBase: {
    decorators: [
      ApiOperation({
        operationId: 'recoverOne',
      }),
    ],
  },
};
