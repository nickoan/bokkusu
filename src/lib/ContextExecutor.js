const vm = require('vm');
const { Context } = require('./Context');

exports.ContextExecutor = async (code) => {
  const context = new Context();
  const script = new vm.Script(code);
  await script.runInNewContext(context, { timeout: 20 * 1000});
  return context;
};

// const code = `
//   $.enableDebug();
//   $.table('user').where({name: '123'}).run();
//   console.log('123');
// `;
//
// exports.ContextExecutor(code).then(() => console.log('finish'));