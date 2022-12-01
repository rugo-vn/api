import { path } from 'ramda';
import { NotFoundError } from '@rugo-vn/exception';

export const selectSchema = function (args) {
  const { appId, params: { model } } = args;

  if (!model) { throw new NotFoundError('Invalid model'); }

  const modelName = appId ? `${appId}.${model}` : model;

  args.name = modelName;
  args.schema = this.globals[`schema.${modelName}`];
  if (!args.schema) { throw new NotFoundError(`Model ${model} is not found`); }

  const auth = args.auth;
  if (!auth) {
    args.gate = () => true;
  } else {
    args.gate = async (action, id) => {
      if ((args.schema.acls || []).indexOf(action) !== -1) { return true; }

      auth.model = model;
      auth.action = action;

      if (id) { auth.id = id; }

      const user = await this.call('auth.gate', {
        token: path(['headers', 'authorization'], args),
        auth
      });

      return !!user;
    };
  }
};
