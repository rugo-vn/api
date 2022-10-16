# Rugo Api

REST Api for handle model.

## Overview

- Using to mapping `@rugo-vn/model` (model mapping) to api with `this` call.
- Using to mapping `@rugo-vn/auth` (auth mapping) to api with `this` call.
- High level permission manage.

## Settings

## Common

### Input Args

- `schemas` Using for mapping Rugo Model.
- `params.model` For select model actions.
- `auth` Auth object for authorization.
- `authSchema` user's schema for authentication.
- `appId` Using for complete modelName with format `appId.modelName`.

### Output Args

## Actions

**Model Mapping**

- It must have `schema` as output args.

### `find`

Find docs from model.

Args Mapping `model.find`:

+ `query.query` -> `query`
+ `query.limit` -> `limit`
+ `query.skip` -> `skip`
+ `query.sort` -> `sort`
+ `query.page` -> `page`

### `get`

Get a doc from model.

Args Mapping `model.get`:

+ `params.id` -> `id`

### `create`

Create a new doc.

Args Mapping `model.create`:

+ `form` -> `data`

### `update`

Update a doc

Args Mapping `model.update`:

+ `params.id` -> `id`
+ `form.set` -> `set`
+ `form.unset` -> `unset`
+ `form.inc` -> `inc`

### `remove`

Remove a doc

Args Mapping `model.remove`:

+ `id` -> `id`

<br />

**Auth Mapping**

### `register`

### `login`

### `about`

### `password`

## License

MIT