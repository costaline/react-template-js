import { parseType } from './common';

const add = (expectations, commonType) => {
  if (expectations.includes(commonType)) return expectations;

  return [...expectations, commonType];
};

const remove = (expectations, commonType) => {
  return expectations.filter((e) => e !== commonType);
};

/**
 *
 * @param expectations
 * @param {{type: string, error?: string|any, payload?: any}} action
 */
export const updateExpectations = (expectations, action) => {
  const { commonType, mode } = parseType(action.type);

  switch (mode) {
    case 'start':
      return add(expectations, commonType);
    case 'success':
    case 'failure':
      return remove(expectations, commonType);
    default:
      return expectations;
  }
};

export const getExpectationStatus = (expectations, type) => {
  const { commonType } = parseType(type);

  return expectations.includes(commonType);
};
