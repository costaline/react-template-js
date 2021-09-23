/**
 * @typedef {string[]} AsyncTasks
 */

/**
 *
 * @param {AsyncTasks|[]} asyncTasks
 * @param {string} name
 * @return {string[]}
 */
const add = (asyncTasks, name) => {
  if (asyncTasks.includes(name)) return asyncTasks;

  return [...asyncTasks, name];
};

/**
 * @param {AsyncTasks|[]} asyncTasks
 * @param {string} name
 * @return {boolean}
 */
const isRequesting = (asyncTasks, name) => {
  return asyncTasks.includes(name);
};

/**
 *
 * @param {AsyncTasks|[]} asyncTasks
 * @param {string} name
 * @return {string[]|[]}
 */
const remove = (asyncTasks, name) => {
  return asyncTasks.filter((r) => r !== name);
};

export const asyncTaskHelpers = {
  add,
  isRequesting,
  remove,
};
