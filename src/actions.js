import { ForbiddenError } from './exceptions.js';
import { ApiResp } from './utils.js';

export const get = async function ({ params: { id }, schema, gate }) {
  if (!await gate('get', id)) { throw new ForbiddenError('Not allow to do this action'); }

  const doc = await this.call('model.get', { id, name: schema._name });
  return ApiResp(doc);
};

export const find = async function ({ query, schema, gate }) {
  if (!await gate('find')) { throw new ForbiddenError('Not allow to do this action'); }

  const resp = await this.call('model.find', { ...query, name: schema._name });
  return ApiResp(resp);
};

export const create = async function ({ form, schema, gate }) {
  if (!await gate('create')) { throw new ForbiddenError('Not allow to do this action'); }

  const resp = await this.call('model.create', { data: form, name: schema._name });
  return ApiResp(resp);
};

export const update = async function ({ params: { id }, form, schema, gate }) {
  if (!await gate('update', id)) { throw new ForbiddenError('Not allow to do this action'); }

  const resp = await this.call('model.update', { id, ...form, name: schema._name });
  return ApiResp(resp);
};

export const remove = async function ({ params: { id }, schema, gate }) {
  if (!await gate('remove', id)) { throw new ForbiddenError('Not allow to do this action'); }

  const resp = await this.call('model.remove', { id, name: schema._name });
  return ApiResp(resp);
};

export const register = async function ({ form, authModel: model }) {
  const resp = await this.call('auth.register', { data: form, model });

  return ApiResp({ data: resp });
};

export const login = async function ({ form, authModel: model }) {
  const resp = await this.call('auth.login', { data: form, model });

  return ApiResp({ data: resp });
};
