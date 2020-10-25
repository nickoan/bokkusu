export const cacheGetter = (name) => {
  const oriValue = window.localStorage.getItem(name);
  if (!oriValue) {
    return null;
  }

  return JSON.parse(oriValue);
}

export const cacheSetter = (name, value) => {
  const jsonStr = JSON.stringify(value);
  window.localStorage.setItem(name, jsonStr);
}

export const cacheItemDelete = (name) => {
  window.localStorage.removeItem(name);
}