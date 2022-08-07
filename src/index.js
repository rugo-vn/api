import { clone, path } from 'ramda';

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

    ctx.meta.perm.action = 'get';
    ctx.meta.perm.id = id;
    
    const gateResp = await this.gate(ctx);
    if (gateResp)
      return gateResp;

    const resp = await ctx.call('model.get', { id });

    return handleResp(resp);
  },

  async find (ctx) {
    if (ctx.locals.resp) { return ctx.locals.reps; }

    const query = path(['params', 'query'], ctx) || {};

    ctx.meta.perm.action = 'find';
    ctx.meta.perm.id = '*';
    
    const gateResp = await this.gate(ctx);
    if (gateResp)
      return gateResp;

    const resp = await ctx.call('model.find', query);

    return handleResp(resp);
  },

  async create (ctx) {
    if (ctx.locals.resp) { return ctx.locals.reps; }

    const doc = path(['params', 'form'], ctx) || {};

    ctx.meta.perm.action = 'create';
    ctx.meta.perm.id = '*';

    const gateResp = await this.gate(ctx);
    if (gateResp)
      return gateResp;

    const resp = await ctx.call('model.create', { doc });

    return handleResp(resp);
  },

  async patch (ctx) {
    if (ctx.locals.resp) { return ctx.locals.reps; }

    const id = path(['params', 'params', 'id'], ctx);

    ctx.meta.perm.action = 'patch';
    ctx.meta.perm.id = id;

    const gateResp = await this.gate(ctx);
    if (gateResp)
      return gateResp;

    const { set, unset, inc } = path(['params', 'form'], ctx) || {};

    const resp = await ctx.call('model.patch', { id, set, unset, inc });

    return handleResp(resp);
  },

  async remove (ctx) {
    if (ctx.locals.resp) { return ctx.locals.reps; }

    const id = path(['params', 'params', 'id'], ctx);

    ctx.meta.perm.action = 'remove';
    ctx.meta.perm.id = id;

    const gateResp = await this.gate(ctx);
    if (gateResp)
      return gateResp;

    const resp = await ctx.call('model.remove', { id });

    return handleResp(resp);
  }
};

export const methods = {
  getSchema (ctx) {
    const { params, meta, locals } = ctx;
    const model = path(['params', 'model'], params);
    const schemas = meta.schemas || [];

    locals.perms = clone(meta.perm);
    meta.perm ||= {};
    meta.perm.model = model;

    for (let schema of schemas)
      if (schema.name === model){
        meta.schema = schema;
        break;
      }

    if (!meta.schema) {
      locals.resp = NOT_FOUND_RESP;
    }
  },

  async gate (ctx) {
    if (this.gateEnabled === undefined){
      this.gateEnabled = (await ctx.call("$node.actions")).map(item => item.name).indexOf('auth.gate') !== -1;
    }

    if (!this.gateEnabled){
      return null;
    }

    return await ctx.call('auth.gate', ctx.params);
  }
};

export const hooks = {
  before: {
    get: 'getSchema',
    find: 'getSchema',
    create: 'getSchema',
    patch: 'getSchema',
    remove: 'getSchema'
  },

  after: {
    async '*' (ctx, res) {
      // restore perm
      ctx.meta.perm = ctx.locals.perms || ctx.meta.perm;      
      return res;
    }
  }
};
