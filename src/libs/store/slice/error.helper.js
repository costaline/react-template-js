const add = (errors, name, error) => {
  const result = { ...errors };

  result[name] = error;

  return result;
};

const get = (sliceState, name) => {
  return sliceState.errors[name];
};

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
