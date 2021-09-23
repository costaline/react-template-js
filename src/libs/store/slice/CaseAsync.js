import { asyncTaskHelpers } from './asyncTask.helper';
import { Case } from './Case';
import { errorHelpers } from './error.helper';

export class CaseAsync {
  constructor(name, type) {
    this._name = name;
    this._type = type;

    this.request = new Case(`${name} request`, `${type} request`);
    this.success = new Case(`${name} success`, `${type} success`);
    this.failure = new Case(`${name} failure`, `${type} failure`, true);
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get selector() {
    return {
      isRequesting: this._isRequesting,
      error: this._getError,
    };
  }

  get asyncTask() {
    return {
      add: this._addAsyncTask,
      remove: this._removeAsyncTask,
    };
  }

  get error() {
    return {
      add: this._addError,
      remove: this._removeError,
    };
  }

  /** @private */
  _addAsyncTask = (asyncTasks) => {
    return asyncTaskHelpers.add(asyncTasks, this.name);
  };

  /** @private */
  _isRequesting = (asyncTasks) => {
    return asyncTaskHelpers.isRequesting(asyncTasks, this.name);
  };

  /** @private */
  _removeAsyncTask = (asyncTasks) => {
    return asyncTaskHelpers.remove(asyncTasks, this.name);
  };

  /** @private */
  _addError = (errors, error) => {
    return errorHelpers.add(errors, error, this.name);
  };

  /** @private */
  _getError = (errors) => {
    return errorHelpers.get(errors, this.name);
  };

  /** @private */
  _removeError = (errors) => {
    return errorHelpers.remove(errors, this.name);
  };
}
