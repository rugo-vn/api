import { ForbiddenError } from '@rugo-vn/exception';
import { ApiResp } from './utils.js';

export const get = async function ({ params: { id }, name, gate }) {
  if (!await gate('get', id)) { throw new ForbiddenError('Not allow to do this action'); }

  const doc = await this.call('model.get', { id, name });
  return ApiResp(doc);
};

export const find = async function ({ query, name, gate }) {
  if (!await gate('find')) { throw new ForbiddenError('Not allow to do this action'); }

  const resp = await this.call('model.find', { ...query, name });
  return ApiResp(resp);
};

export const create = async function ({ form, name, gate }) {
  if (!await gate('create')) { throw new ForbiddenError('Not allow to do this action'); }

  const resp = await this.call('model.create', { data: form, name });
  return ApiResp(resp);
};

export const update = async function ({ params: { id }, form, name, gate }) {
  if (!await gate('update', id)) { throw new ForbiddenError('Not allow to do this action'); }

  const resp = await this.call('model.update', { id, ...form, name });
  return ApiResp(resp);
};

export const remove = async function ({ params: { id }, name, gate }) {
  if (!await gate('remove', id)) { throw new ForbiddenError('Not allow to do this action'); }

  const resp = await this.call('model.remove', { id, name });
  return ApiResp(resp);
};

export const x = async function ({ params: { action, id }, form, query, name, schema, gate }) {
  if (!await gate(action)) { throw new ForbiddenError('Not allow to do this action'); }

  if (action === 'download' && schema.driver === 'fs') {
    const { data: doc } = await this.call('model.get', { id, name });
    return ApiResp(doc.data);
  }

  const resp = await this.call(`model.${action}`, { id, ...query, ...form, name });
  return ApiResp(resp);
};

export const register = async function ({ form }) {
  const resp = await this.call('auth.register', { data: form });

  return ApiResp({ data: resp });
};

export const login = async function ({ form }) {
  const resp = await this.call('auth.login', { data: form });

  return ApiResp({ data: resp });
};
