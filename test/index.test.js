/* eslint-disable */

import { expect } from 'chai';
import { createBroker } from '@rugo-vn/service';

const modelService = {
  name: 'model',
  actions: {}
};

for (let action of ['get', 'find', 'create', 'remove', 'update', 'register', 'login', 'about', 'password'])
  modelService.actions[action] = function(args) { return args; };

const authService = {
  name: 'auth',
  actions: {
    register(args){ return args },
    login(args){ return args },
  }
}

const AUTH_SCHEMA = { _name: 'bar' };

const DEFAULT_SETTINGS = {
  authModel: AUTH_SCHEMA._name,
};

describe('Api test', () => {
  let broker;

  beforeEach(async () => {
    broker = createBroker({
      _services: [
        './src/index.js',
      ],
      _globals: {
        'schema.foo': { _name: 'foo' },
        [`schema.${AUTH_SCHEMA._name}`]: AUTH_SCHEMA,
      },
    });

    await broker.loadServices();
    await broker.createService(modelService);
    await broker.createService(authService);
    await broker.start();
  });

  afterEach(async () => {
    await broker.close();
  });

  it('should get', async () => {
    const { data } = await broker.call('api.get', { 
      params: { id: 0, model: 'foo' },
      ...DEFAULT_SETTINGS
    });

    expect(data).to.has.property('id', 0);
    expect(data).to.has.property('name');
  }); 

  it('should find', async () => {
    const { data } = await broker.call('api.find', { 
      params: { model: 'foo' }, 
      query: { query: { name: 'foo' }, page: 1, limit: 5 },
      ...DEFAULT_SETTINGS
    });

    expect(data).to.has.property('query');
    expect(data).to.has.property('page', 1);
    expect(data).to.has.property('limit', 5);
  });

  it('should create', async () => {
    const { data } = await broker.call('api.create', { 
      params: { model: 'foo' }, 
      form: { foo: 'bar' },
      ...DEFAULT_SETTINGS
    });

    expect(data.data).to.has.property('foo', 'bar');
  });


  it('should patch', async () => {
    const { data } = await broker.call('api.update', { 
      params: { id: 0, model: 'foo' }, 
      form: { set: { foo: 'bar' } },
      ...DEFAULT_SETTINGS
    });

    expect(data.set).to.has.property('foo', 'bar');
  });

  it('should remove', async () => {
    const { data } = await broker.call('api.remove', { params: { id: 0, model: 'foo' }, ...DEFAULT_SETTINGS });
    expect(data).to.has.property('id', 0);
  }); 

  it('should register', async () => {
    const { data: { data } } = await broker.call(`api.register`, {
      form: { username: 'foo', password: '123456' },
      ...DEFAULT_SETTINGS,
    });

    expect(data.data).to.has.property('username', 'foo');
  });

  it('should login', async () => {
    const { data: { data } } = await broker.call('api.login', {
      form: { username: 'foo', password: '123456' },
      ...DEFAULT_SETTINGS,
    });

    expect(data.data).to.has.property('username', 'foo');
  });
});