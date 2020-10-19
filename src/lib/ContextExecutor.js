const vm = require('vm');
const { Context } = require('./Context');

exports.ContextExecutor = async (code) => {
  const context = new Context();
  const script = new vm.Script(code);
  await script.runInNewContext(context, { timeout: 20 * 1000});
  return context;
};