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
  constructor(name = 'pg', options = {}) {
    if (!AdaptorAccept.includes(name)) {
      throw new Error('adaptor name cannot be empty');
    }
    this.client = PgClient;
    this.builder = Knex({client: name});
    this.options = options;
  }

  search(sql) {
    this.client.query({
      text: sql,
      rowMode: 'array',
    });
  }

  table(param) {
    const builder = this.builder(param);
    const tmpContext = this;

    builder.constructor.prototype.run = function () {
      return tmpContext.search(this.toString());
    };

    return builder;
  }

}

exports.Adaptor = Adaptor;