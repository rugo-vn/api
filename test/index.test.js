/* eslint-disable */
import * as apiService from '../src/index.js';
import { ServiceBroker } from 'moleculer';
import { expect } from 'chai';

const modelService = {
  name: 'model',
  actions: {
    get({ params, meta }){ return { params, meta }; },
    find({ params, meta }){ return { params, meta }; },
    create({ params, meta }){ return { params, meta }; },
    patch({ params, meta }){ return { params, meta }; },
    remove({ params, meta }){ return { params, meta }; }
  }
};

const DEFAULT_SETTINGS = { meta: { schemas: { foo: 'bar' } } };

describe('Api test', () => {
  let broker;

  beforeEach(async () => {
    broker = new ServiceBroker();
    broker.createService(modelService)
    broker.createService({ ...apiService });
    await broker.start();
  });

  afterEach(async () => {
    await broker.stop();
  });

  it('should get', async () => {
    const { body, status } = await broker.call('api.get', { params: { id: 0, model: 'foo' } }, DEFAULT_SETTINGS);
    expect(status).to.not.be.eq(404);
    expect(body.params).to.has.property('id', 0);
    expect(body.meta).to.has.property('schema', 'bar');
  }); 

  it('should find', async () => {
    const { body, status } = await broker.call('api.find', { 
      params: { model: 'foo' }, 
      query: { filters: { name: 'foo' }, page: 1 } 
    }, DEFAULT_SETTINGS);

    expect(status).to.not.be.eq(404);
    expect(body.params).to.has.property('filters');
    expect(body.params).to.has.property('page', 1);
    expect(body.params.filters).to.has.property('name', 'foo');
  });

  it('should create', async () => {
    const { body, status } = await broker.call('api.create', { 
      params: { model: 'foo' }, 
      form: { foo: 'bar' }
    }, DEFAULT_SETTINGS);

    expect(status).to.not.be.eq(404);
    expect(body.params.doc).to.has.property('foo', 'bar');
  });

  it('should patch', async () => {
    const { body, status } = await broker.call('api.patch', { 
      params: { model: 'foo' }, 
      form: { set: { foo: 'bar' } }
    }, DEFAULT_SETTINGS);

    expect(status).to.not.be.eq(404);
    expect(body.params.set).to.has.property('foo', 'bar');
  });

  it('should get', async () => {
    const { body, status } = await broker.call('api.remove', { params: { id: 0, model: 'foo' } }, DEFAULT_SETTINGS);
    expect(status).to.not.be.eq(404);
    expect(body.params).to.has.property('id', 0);
    expect(body.meta).to.has.property('schema', 'bar');
  }); 
});