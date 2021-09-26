export class AsyncTaskHelper {
  static add = (asyncTasks, name) => {
    if (asyncTasks.includes(name)) return asyncTasks;

    return [...asyncTasks, name];
  };

  static remove = (asyncTasks, name) => {
    return asyncTasks.filter((r) => r !== name);
  };

  static isPending = (asyncTasks, name) => {
    return asyncTasks.includes(name);
  };

  constructor(taskName) {
    this.add = (asyncTasks) => AsyncTaskHelper.add(asyncTasks, taskName);
    this.remove = (asyncTasks) => AsyncTaskHelper.remove(asyncTasks, taskName);
    this.isPending = (asyncTasks) =>
      AsyncTaskHelper.isPending(asyncTasks, taskName);
  }
}
