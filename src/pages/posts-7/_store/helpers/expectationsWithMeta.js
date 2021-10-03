import { parseType } from './common';

/**
 *
 * @typedef ExpectationMeta
 * @property {string|number} key
 */

/**
 *
 * @param expectations
 * @param commonType
 * @param {ExpectationMeta} meta
 * @returns {*[]}
 */
const add = (expectations, commonType, meta) => {
  const isExists = !!expectations.find((item) => {
    if (Array.isArray(item)) {
      const [expectation, { key }] = item;

      return expectation === commonType && key === meta.key;
    }

    return false;
  });

  if (isExists) return expectations;

  return [...expectations, [commonType, meta]];
};

/**
 *
 * @param expectations
 * @param commonType
 * @param {ExpectationMeta} meta
 * @returns {*}
 */
const remove = (expectations, commonType, meta) => {
  try {
    return expectations.filter((item) => {
      if (Array.isArray(item)) {
        const [expectation, { key }] = item;

        return !(expectation === commonType && key === meta.key);
      }

      return true;
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Error to update expectations: ', e.toString());

    return expectations;
  }
};

/**
 *
 * @param expectations
 * @param action
 * @param {ExpectationMeta} meta
 * @returns {*}
 */
export const updateExpectationsWithMeta = (expectations, action, meta) => {
  const { commonType, mode } = parseType(action.type);

  switch (mode) {
    case 'start':
      return add(expectations, commonType, meta);
    case 'success':
    case 'failure':
      return remove(expectations, commonType, meta);
    default:
      return expectations;
  }
};

export const getExpectationsWithMeta = (expectations, type) => {
  const { commonType } = parseType(type);

  return expectations.filter((item) => {
    if (Array.isArray(item)) {
      const [expectation] = item;

      return expectation === commonType;
    }

    return false;
  });
};
