import { parseType } from './common';

const add = (errors, type, error, meta) => {
  const result = { ...errors };

  const errorsByType = errors[type] || [];

  if (Array.isArray(errorsByType)) {
    const isExists = !!errorsByType.find(({ key }) => key === meta.key);

    if (isExists) return result;

    result[type] = [...errorsByType, meta];

    return result;
  }

  return errors;
};

const remove = (errors, type, meta) => {
  const result = { ...errors };

  const errorsByType = errors[type] || [];

  if (Array.isArray(errorsByType) && errorsByType.length) {
    result[type] = errorsByType.filter(({ key }) => key !== meta.key);

    return result;
  }

  return errors;
};

export const updateErrorsWithMeta = (errors, action, meta) => {
  const { commonType, mode } = parseType(action.type);

  switch (mode) {
    case 'start':
      return remove(errors, commonType, meta);
    case 'failure':
      return add(errors, commonType, action.error, meta);
    default:
      return errors;
  }
};

export const getErrorWithMeta = (errors, type) => {
  const { commonType } = parseType(type);

  return errors[commonType] || [];
};
