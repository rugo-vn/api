import { RugoException } from '@rugo-vn/service';
import { path } from 'ramda';
import { NotFoundError } from './exceptions.js';

export const selectSchema = function (args) {
  const { appId, params: { model } } = args;

  if (!model) { throw new NotFoundError('Invalid model'); }

  const modelName = appId ? `${appId}.${model}` : model;

  args.schema = this.globals[`schema.${modelName}`];
  if (!args.schema) { throw new NotFoundError(`Model ${model} is not found`); }

  const auth = args.auth;
  if (!auth) {
    args.gate = () => true;
  } else {
    args.gate = async (action, id) => {
      if ((args.schema._acl || []).indexOf(action) !== -1) { return true; }

      if (!args.authModel) {
        return true;
      }

      auth.action = action;

      if (id) { auth.id = id; }

      const user = await this.call('auth.gate', {
        token: path(['headers', 'authorization'], args),
        model: args.authModel,
        auth
      });

      return !!user;
    };
  }
};

export const checkAuthSchema = function (args) {
  if (!args.authModel) {
    throw new RugoException('Not have schema for auth');
  }
};
