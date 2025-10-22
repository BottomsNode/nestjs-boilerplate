import { HttpException, HttpStatus } from '@nestjs/common';

export class RpcBaseException extends HttpException {
  public readonly payload: string | Record<string, unknown>;
  public readonly type: string;
  public readonly isRpc = true;

  constructor(
    payload: string | Record<string, any>,
    status: number,
    errorType?: string,
  ) {
    super(payload, status);
    this.payload = payload;
    this.type = errorType ?? new.target.name;
  }

  public override getStatus(): number {
    return super.getStatus();
  }

  public getPayload(): string | Record<string, unknown> {
    return this.payload;
  }

  public getType(): string {
    return this.type;
  }

  public override getResponse(): string | object {
    return {
      isRpc: this.isRpc,
      type: this.type,
      status: this.getStatus(),
      payload: this.payload,
    };
  }

  public static createPayload(
    objectOrError: object | string,
    description?: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ): object {
    if (!objectOrError) {
      return { statusCode, message: description ?? 'Unexpected error' };
    }

    const isObject =
      typeof objectOrError === 'object' &&
      objectOrError !== null &&
      !Array.isArray(objectOrError);

    if (isObject) {
      return objectOrError;
    }

    return {
      statusCode,
      message:
        typeof objectOrError === 'string'
          ? objectOrError
          : JSON.stringify(objectOrError),
      error: description ?? 'Error',
    };
  }
}
