import { ApiResp } from './utils.js';

export const get = async function ({ params: { id }, schema }) {
  const doc = await this.call('model.get', { id, schema });
  return ApiResp(doc);
};

export const find = async function ({ query, schema }) {
  const resp = await this.call('model.find', { ...query, schema });
  return ApiResp(resp);
};

export const create = async function ({ form, schema }) {
  const resp = await this.call('model.create', { data: form, schema });
  return ApiResp(resp);
};

export const update = async function ({ params: { id }, form, schema }) {
  const resp = await this.call('model.update', { id, ...form, schema });
  return ApiResp(resp);
};

export const remove = async function ({ params: { id }, schema }) {
  const resp = await this.call('model.remove', { id, schema });
  return ApiResp(resp);
};
