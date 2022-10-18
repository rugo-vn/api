import { RugoException } from '@rugo-vn/service';

export class NotFoundError extends RugoException {
  constructor (msg = 'Not found') {
    super(msg);

    this.status = 404;
  }
}

export class ForbiddenError extends RugoException {
  constructor (msg) {
    super(msg);

    this.status = 403;
  }
}
