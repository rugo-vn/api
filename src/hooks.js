import { NotFoundError } from './exceptions.js';

export const before = {
  async all (args) {
    const { params: { model }, schemas } = args;

    if (!model) { throw new NotFoundError('Invalid model'); }

    for (const schema of schemas) {
      if (schema._name === model) {
        args.schema = schema;
        break;
      }
    }

    if (!args.schema) { throw new NotFoundError(`Model ${model} is not found`); }
  }
};
