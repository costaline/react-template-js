import { camelCase } from 'camel-case';

import { asyncTaskHelpers } from './asyncTask.helper';
import { Case } from './Case';
import { CaseAsync } from './CaseAsync';
import { errorHelpers } from './error.helper';
import { createType, pipe } from './helpers';

export class Slice {
  static get asyncTask() {
    return asyncTaskHelpers;
  }

  static get error() {
    return errorHelpers;
  }

  /**
   * @private
   */
  _cases = {};
  /**
   * @private
   */
  _actions = {};

  constructor(name) {
    this._sliceName = name;
  }

  get cases() {
    return this._cases;
  }

  get actions() {
    return this._actions;
  }

  get name() {
    return this._sliceName;
  }

  /**
   *
   * @returns {Slice}
   */
  add(name, options = {}) {
    return this._createCase(name, options, false);
  }

  /**
   *
   * @returns {Case|CaseAsync}
   */
  create(name, options = {}) {
    return this._createCase(name, options, true);
  }

  /**
   * @private
   */
  _saveCase = (sliceCase) => {
    this._cases[sliceCase.name] = sliceCase.type;
  };

  /**
   * @private
   */
  _saveAction = (sliceCase) => {
    this._actions[sliceCase.name] = sliceCase.ac;
  };

  /**
   * @private
   */
  _save(sliceCase) {
    if (sliceCase instanceof CaseAsync) {
      for (const key in sliceCase) {
        if (sliceCase[key] instanceof Case) {
          pipe(this._saveCase, this._saveAction)(sliceCase[key]);
        }
      }
    } else {
      pipe(this._saveCase, this._saveAction)(sliceCase);
    }
  }

  /**
   * @private
   */
  _createCase = (name, options, isReturnable) => {
    const { async = false, payloadAsError = false } = options;

    const camelCasedName = camelCase(name);

    const type = createType(this._sliceName, camelCasedName);

    if (async) {
      const asyncCase = new CaseAsync(camelCasedName, type);

      this._save(asyncCase);

      return isReturnable ? asyncCase : this;
    }

    const syncCase = new Case(camelCasedName, type, payloadAsError);

    this._save(syncCase);

    return isReturnable ? syncCase : this;
  };
}
