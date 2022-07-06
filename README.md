# Rugo Api

REST Api for handle model.

## Usage

### createApi

```js
const api = createApi(composer);

const exec = api(model, 'get', id);
const exec = api(model, 'list', query);
const exec = api(model, 'create', doc);
const exec = api(model, 'patch', id, doc);
const exec = api(model, 'remove', id);
const exec = api(model, 'custom', ...args);

await exec(context);
```

## Plugin

```js
const plugin = {
  ...BasePlugin,

  depends: ['server', 'model'],
  async start({ server }){
    const router = new Router();

    router.get('/:modelName', api('.model', 'list', '.query'));
    router.get('/:modelName/:id', api('.model', 'get', '.params.id'));
    router.post('/:modelName', api('.model', 'create', '.form'));
    router.patch('/:modelName/:id', api('.model', 'patch', '.params.id', '.form'));
    router.delete('/:modelName/:id', api('.model', 'remove', '.params.id'));

    server.use(router.routes());
  }
}
```