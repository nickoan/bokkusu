const {Context} = require('./Context');

exports.listAllTables = async (options) => {
  const context = new Context(options);
  const result = await context.client.listAvailableTables();
  return result.rows;
}