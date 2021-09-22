const add = (asyncTasks, name) => {
  if (asyncTasks.includes(name)) return asyncTasks;

  return [...asyncTasks, name];
};

const isRequesting = (sliceState, name) => {
  return sliceState.asyncTasks.includes(name);
};

const remove = (asyncTasks, name) => {
  return asyncTasks.filter((r) => r !== name);
};

export const asyncTaskHelpers = {
  add,
  isRequesting,
  remove,
};
