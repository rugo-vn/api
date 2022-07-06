/* eslint-disable */

import { expect } from 'chai';

import { BaseComposer, KoaComposer } from "@rugo-vn/common";
import createApi from '../src/api.js';

class CustomError extends Error {
  constructor(message){
    super(message);

    this.status = 400;
  }
}

const FakeModel = {
  get(id){ return id; },
  create(){ throw new Error('Test error'); },
  patch(){ throw new CustomError('Test error'); },
  remove(){ return null; },
}

describe('Api test', () => {
  it('should be created api with base composer', async () => {
    const api = createApi(BaseComposer);

    const result = await api(FakeModel, 'get', 1)();

    expect(result).to.has.property('status', 200);
    expect(result).to.has.property('data', 1);

    const result2 = await api(FakeModel, 'remove', 1)();

    expect(result2).to.has.property('status', 404);
    expect(result2).to.has.property('data', 'Not found');
  });

  it('should be created api with koa composer', async () => {
    const api = createApi(KoaComposer);

    const context = {};
    const result = await api(FakeModel, 'get', 1)(context);

    expect(result).to.has.property('status', 200);
    expect(result).to.has.property('data', 1);

    expect(context).to.has.property('status', 200);
    expect(context).to.has.property('body');
    expect(context.body).to.has.property('status', 'success');
    expect(context.body).to.has.property('data', 1);
  });

  it('should be throw error with base composer', async () => {
    const api = createApi(BaseComposer);

    const result = await api(FakeModel, 'create', 1)();

    expect(result).to.has.property('status', 500);
    expect(result).to.has.property('data', 'Test error');

    const result2 = await api(FakeModel, 'patch', 1)();

    expect(result2).to.has.property('status', 400);
    expect(result2).to.has.property('data', 'Test error');
  });
});

