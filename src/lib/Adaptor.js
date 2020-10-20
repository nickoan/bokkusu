const PgClient = require('pg').Client;
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
  constructor(name = 'pg', context, options = {}) {
    if (!AdaptorAccept.includes(name)) {
      throw new Error('adaptor name cannot be empty');
    }
    this.client = PgClient;
    this.builder = Knex({client: name});
    this.options = options;
    this.context = context;
    this.debug = false;
  }

  enableDebug() {
    this.debug = true;
  }

  search(sql) {
    const result = this.client.query({
      text: sql,
      rowMode: 'array',
    });

    this.context.$queryResult = result;
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

    builder.constructor.prototype.run = function () {
      return context.search(this.toString());
    };
  }
}

exports.Adaptor = Adaptor;