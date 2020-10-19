const { Adaptor } = require('./Adaptor');

class Context {
  constructor() {
    this.client = new Adaptor('pg');
    this.$ = this.client;
  }
}

exports.Context = Context;