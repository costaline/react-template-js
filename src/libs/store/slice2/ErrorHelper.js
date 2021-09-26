export class ErrorHelper {
  static add = (errors, name, error) => {
    const result = { ...errors };

    result[name] = error;

    return result;
  };

  static remove = (errors, name) => {
    const result = { ...errors };

    delete result[name];

    return result;
  };

  static get = (errors, name) => {
    return errors[name] || null;
  };

  constructor(errorName) {
    this.add = (errors, error) => ErrorHelper.add(errors, errorName, error);
    this.remove = (errors) => ErrorHelper.remove(errors, errorName);
    this.get = (errors) => ErrorHelper.get(errors, errorName);
  }
}
