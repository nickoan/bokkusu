const { Adaptor } = require('./Adaptor');

class Context {
  constructor() {
    this.client = new Adaptor('pg', this);
    this.$ = this.client;
    this.$queryResult = null;
    this.console = console;
  }
}

exports.Context = Context;