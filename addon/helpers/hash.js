export function hashObj(_, obj) {
  const returnObj = {};

  for (const key in obj) { // eslint-disable-line
    returnObj[key] = obj[key];
  }

  return returnObj;
}

export default Ember.Helper.helper(hashObj);
