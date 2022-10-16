export const ApiResp = (data, meta) => ({ data, ...(meta ? { meta } : {}) });
