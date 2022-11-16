const mapHook = (actions, method) => actions.reduce((s, i) => ({ ...s, [i]: method }), {});

export const before = {
  ...mapHook(['get', 'find', 'create', 'update', 'remove', 'x'], 'selectSchema'),
  ...mapHook(['register', 'login'], 'checkAuthSchema')
};
