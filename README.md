# Rugo Api

REST Api for handle model.

## Overview

- Using to mapping `@rugo-vn/model` (model mapping) to api with `this` call.
- Using to mapping `@rugo-vn/auth` (auth mapping) to api with `this` call.
- High level permission manage.

## Settings

## Common

### Globals

- `schema.<modelName>`

### Input Args

Using Rugo Server output args as input, and some variables below:

- `params.model` For select model actions.
- `auth` Auth object for authorization.
- `appId` Using for complete modelName with format `appId.modelName`.

## Actions

**Model Mapping**

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

Args Mapping `auth.register`:

+ `form` -> `data`

### `login`

Args Mapping `auth.login`:

+ `form` -> `data`

### `password`

<br />

**Others**

### `about`

Return

- Basic server response needed with `data` is the user info.

## License

MIT