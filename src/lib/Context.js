const { Adaptor } = require('./Adaptor');

class Context {
  constructor(options = {}) {
    this.options = options;
    this.client = new Adaptor('pg', this, options);
    this.$ = this.client;
    this.$queryResult = null;
    this.console = console;
  }
}

exports.Context = Context;