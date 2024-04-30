import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
  TypeORMError,
} from 'typeorm';
import { Request, Response } from 'express';
import { GlobalResponseError } from '../responses/GlobalResponseError.dto';

@Catch(TypeORMError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message;
    let code = 'HttpException';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (true) {
      case exception instanceof HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case exception instanceof QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        switch (code) {
          case '23505':
            message = 'Duplicate entry';
            break;
          case '23503':
            message = 'Foreign key constraint violation';
            break;
          case '23P02':
            message = 'Invalid text representation for type';
            break;
        }
        break;
      case exception instanceof EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        message = (exception as EntityNotFoundError).message;
        break;
      case exception instanceof CannotCreateEntityIdMapError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        break;
    }

    response
      .status(status)
      .json(new GlobalResponseError(status, message, code, request));
  }
}
