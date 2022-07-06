import { wrapComposer } from '@rugo-vn/common';

/**
 * Create api endpoint.
 *
 * @param {Composer} composer Composer to processing arguments and result.
 * @returns {Function} target function
 */
const createApi = wrapComposer(async (model, action, ...args) => {
  const result = {};
  try {
    const res = await model[action](...args);

    result.status = res === null ? 404 : 200;
    result.data = res === null ? 'Not found' : res;
  } catch (err) {
    result.status = err.status || 500;
    result.data = err.message;
  }

  return result;
});
export default createApi;
