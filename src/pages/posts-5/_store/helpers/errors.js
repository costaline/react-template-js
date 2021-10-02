import { parseType } from './common';

const add = (errors, type, error) => {
  const result = { ...errors };

  result[type] = error;

  return result;
};

const remove = (errors, type) => {
  const result = { ...errors };

  delete result[type];

  return result;
};

export const updateErrors = (errors, action) => {
  const { commonType, mode } = parseType(action.type);

  switch (mode) {
    case 'start':
      return add(errors, commonType, action.error);
    case 'failure':
      return remove(errors, commonType);
    default:
      return errors;
  }
};

export const getError = (errors, type) => {
  const { commonType } = parseType(type);

  return errors[commonType];
};
