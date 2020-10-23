const { remote } = require('electron');

export default (name) => {
  return remote.getGlobal(name);
}