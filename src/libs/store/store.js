/** helpers */
/**
 * ActionWithName type definition
 * @typedef {Object} ActionWithName
 * @property {string} type - for redux
 * @property {string} _name
 */

/**
 * Request status type definition
 * @typedef {'pending'|'fulfilled'|'rejected'} RequestStatus
 */

/**
 * Creates type string for redux type
 * @param {string} sliceName
 * @param {string} requestName
 * @param {RequestStatus} status
 * @returns string
 * @example
 * // return '[prefix|REQUEST_NAME] status'
 */
export const createType = (sliceName, requestName, status) => {
  return `[${
    sliceName ? sliceName.toLowerCase() + '|' : ''
  }${requestName.toUpperCase()}] ${status}`;
};

/**
 *
 * @param {string} sliceName
 * @returns {function(string, RequestStatus): string}
 */
export const typeCreator = (sliceName) => {
  return (requestName, status) => {
    return `[${sliceName.toLowerCase()}|${requestName.toUpperCase()}] ${status}`;
  };
};

/**
 * Adds name to action object
 * @param {string} name
 * @returns {function(Object|function, ...[*]): ActionWithName}
 * @example <caption>target as object</caption>
 * // const withName = addActionName('some-name')
 * // dispatch(withName(someActionCreator()))
 * @example <caption>target as function without params</caption>
 * // const withName = addActionName('some-name')
 * // dispatch(withName(someActionCreator))
 *  @example <caption>target as function with params</caption>
 * // const withName = addActionName('some-name')
 * // dispatch(withName(someActionCreator, {foo: 42}))
 */
export const addActionName = (name) => {
  return (target, ...args) => {
    return Object.assign(
      typeof target === 'function' ? target(...args) : target,
      { _name: name }
    );
  };
};

/**
 *
 * @param {Array<string>} requests
 * @param {string} target
 * @returns {Array<string>|[]}
 */
export const updateSliceRequests = (requests, target) => {
  return requests.filter((r) => r !== target);
};

/**
 *
 * @param {Object<string, string>} errors
 * @param {string} target
 * @returns {Object<string, string>}
 */
export const updateSliceErrors = (errors, target) => {
  const result = { ...errors };

  delete result[target];

  return result;
};

/**
 *
 * @param sliceName
 * @param requestName
 * @returns {{data: (function(*): *), isFetching: (function(*): boolean), error: (function(*): *)}}
 */
export const createRequestSelector = (sliceName, requestName) => {
  return {
    data: (state) => state[sliceName][requestName],
    isFetching: (state) => state[sliceName].requests.includes(requestName),
    error: (state) => state[sliceName].errors[requestName],
  };
};
