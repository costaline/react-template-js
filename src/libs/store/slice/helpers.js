export const pipe = (...functions) => {
  return (sliceCase) => {
    functions.reduce((target, f) => {
      f(target);

      return target;
    }, sliceCase);
  };
};

export const createType = (sliceName, name) => {
  return `${sliceName} [${name}]`;
};
