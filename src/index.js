import { path } from 'ramda';

export const name = 'api';

const NOT_FOUND_RESP = {
  status: 404,
  body: {
    status: 'error',
    data: [{ type: 'general', message: 'not found' }]
  }
};

const handleResp = resp => {
  if (!resp) { return NOT_FOUND_RESP; }

  if (resp.status === 'error') { return { status: 400, body: resp }; }

  return { body: resp };
};

export const actions = {
  async get (ctx) {
    if (ctx.locals.resp) { return ctx.locals.reps; }

    const id = path(['params', 'params', 'id'], ctx);
    const resp = await ctx.call('model.get', { id });

    return handleResp(resp);
  },

  async find (ctx) {
    if (ctx.locals.resp) { return ctx.locals.reps; }

    const query = path(['params', 'query'], ctx) || {};
    const resp = await ctx.call('model.find', query);

    return handleResp(resp);
  },

  async create (ctx) {
    if (ctx.locals.resp) { return ctx.locals.reps; }

    const doc = path(['params', 'form'], ctx) || {};
    const resp = await ctx.call('model.create', { doc });

    return handleResp(resp);
  },

  async patch (ctx) {
    if (ctx.locals.resp) { return ctx.locals.reps; }

    const id = path(['params', 'params', 'id'], ctx);
    const { set, unset, inc } = path(['params', 'form'], ctx) || {};

    const resp = await ctx.call('model.patch', { id, set, unset, inc });

    return handleResp(resp);
  },

  async remove (ctx) {
    if (ctx.locals.resp) { return ctx.locals.reps; }

    const id = path(['params', 'params', 'id'], ctx);
    const resp = await ctx.call('model.remove', { id });

    return handleResp(resp);
  }
};

export const methods = {
  getSchema (ctx) {
    const { params, meta } = ctx;
    const model = path(['params', 'model'], params);
    meta.schema = path(['schemas', model], meta);

    if (!meta.schema) {
      ctx.locals.resp = NOT_FOUND_RESP;
    }
  }
};

export const hooks = {
  before: {
    get: 'getSchema',
    find: 'getSchema',
    create: 'getSchema',
    patch: 'getSchema',
    remove: 'getSchema'
  }
};
