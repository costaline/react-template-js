/**
 *
 * @typedef {Object} ErrorObject
 * @property {string} [name]
 * @property {string} message
 */

/**
 * @typedef {string|ErrorObject} ErrorPayload
 */

/**
 * @typedef {Object<string,ErrorPayload>} Errors
 */

/**
 *
 * @param {Errors|{}} errors
 * @param {string} name
 * @param {ErrorPayload} error
 * @return {Errors|{}}
 */
const add = (errors, name, error) => {
  const result = { ...errors };

  result[name] = error;

  return result;
};

/**
 *
 * @param {Errors|{}} errors
 * @param {string} name
 * @return {ErrorPayload|null}
 */
const get = (errors, name) => {
  return errors[name] || null;
};

/**
 *
 * @param {Errors|{}} errors
 * @param {string} name
 * @return {Errors|{}}
 */
const remove = (errors, name) => {
  const result = { ...errors };

  delete result[name];

  return result;
};

export const errorHelpers = {
  add,
  get,
  remove,
};
