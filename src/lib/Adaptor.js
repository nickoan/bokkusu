const pg = require('pg');
const Knex = require('knex');
const AdaptorAccept = ['pg', 'mysql', 'sqlite'];

/**
 * @name adaptor naming;
 * @option database options
 *
 * properties:
 * @client adaptor;
 * @builder statement builder;
 */
class Adaptor {
  constructor(name, context, options = {}) {
    if (!AdaptorAccept.includes(name)) {
      throw new Error('adaptor name cannot be empty');
    }
    this.client = pg.Client;
    this.builder = Knex({client: name});
    this.options = options;
    this.context = context;
    this.debug = false;
  }

  enableDebug() {
    this.debug = true;
  }

  async search(sql) {

    const currentClient = new this.client({
      user: this.options.user,
      host: this.options.host,
      database: this.options.database,
      password: this.options.password,
      port: this.options.port,
    })

    currentClient.connect();

    const result = await currentClient.query({
      text: sql,
      rowMode: 'array',
    });
    currentClient.end();
    this.context.$queryResult = result;
    return result;
  }

  async listAvailableTables() {
    const sql = `
      SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
    `;
    const result = await this.search(sql);
    return result;
  }

  table(param) {
    const builder = this.builder(param);
    this.generateRunFunc(builder, this);
    return builder;
  }

  generateRunFunc(builder, context) {
    if (this.debug) {
      builder.constructor.prototype.run = function () {
        console.log(this.toString());
      };
      return;
    }

    builder.constructor.prototype.run = async function () {
      return (await context.search(this.toString()));
    };

    builder.constructor.prototype.eRun = async function () {
      const query = `EXPLAIN ${this.toString()}`;
      return (await context.search(query));
    }
  }
}

exports.Adaptor = Adaptor;