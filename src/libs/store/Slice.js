import { camelCase } from 'camel-case';

class Case {
  constructor(name, type, payloadAsError) {
    this._name = camelCase(name);
    this.type = type;

    /**
     * Action Creator
     */
    this.ac = this._createAction(type, payloadAsError);
  }

  get name() {
    return this._name;
  }

  /**
   * @private
   */
  _createAction = (type, payloadAsError) => {
    return (payload = null) => {
      if (!payload) return { type };

      if (!payloadAsError) return { type, payload };

      return { type, error: payload };
    };
  };
}

class CaseAsync {
  constructor(name, type) {
    this._name = name;
    this._type = type;

    this.request = new Case(name + ' request', type + ' request');
    this.success = new Case(name + ' success', type + ' success');
    this.failure = new Case(name + ' failure', type + ' failure', true);
  }

  get name() {
    return this._name;
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
  _isRequesting = (sliceState) => {
    return sliceState.asyncTasks.some((r) => r === this.name);
  };

  /** @private */
  _addAsyncTask = (asyncTasks) => {
    if (asyncTasks.some((r) => r === this.name)) return asyncTasks;

    return [...asyncTasks, this.name];
  };

  /** @private */
  _removeAsyncTask = (asyncTasks) => {
    return asyncTasks.filter((r) => r !== this.name);
  };

  /** @private */
  _getError = (sliceState) => {
    return sliceState.errors[this.name];
  };

  /** @private */
  _addError = (errors, error) => {
    const result = { ...errors };

    result[this.name] = error;

    return result;
  };

  /** @private */
  _removeError = (errors) => {
    const result = { ...errors };

    delete result[this.name];

    return result;
  };
}

export class Slice {
  static get asyncTask() {
    return {
      add: (asyncTasks, name) => {
        if (asyncTasks.some((r) => r === name)) return asyncTasks;

        return [...asyncTasks, name];
      },
      isRequesting: (sliceState, name) => {
        return sliceState.asyncTasks.some((r) => r === name);
      },
      remove: (asyncTasks, name) => {
        return asyncTasks.filter((r) => r !== name);
      },
    };
  }

  static get error() {
    return {
      add: (errors, name, error) => {
        const result = { ...errors };

        result[name] = error;

        return result;
      },
      get: (sliceState, name) => {
        return sliceState.errors[name];
      },
      remove: (errors, name) => {
        const result = { ...errors };

        delete result[name];

        return result;
      },
    };
  }

  /**
   * @private
   */
  _cases = {};
  /**
   * @private
   */
  _actions = {};

  get cases() {
    return this._cases;
  }

  get actions() {
    return this._actions;
  }

  constructor(name) {
    this._sliceName = name;
  }

  get name() {
    return this._sliceName;
  }

  /**
   * @private
   */
  _createType(name) {
    return `${this._sliceName} [${name}]`;
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

  _pipe = (...functions) => {
    return (sliceCase) => {
      functions.reduce((target, f) => {
        f(target);

        return target;
      }, sliceCase);
    };
  };

  /**
   * @private
   */
  _save(sliceCase) {
    if (sliceCase instanceof CaseAsync) {
      for (const key in sliceCase) {
        if (sliceCase[key] instanceof Case) {
          this._pipe(this._saveCase, this._saveAction)(sliceCase[key]);
        }
      }
    } else {
      this._pipe(this._saveCase, this._saveAction)(sliceCase);
    }
  }

  create(name, options = {}) {
    const { async = false, payloadAsError = false } = options;

    const camelCasedName = camelCase(name);

    const type = this._createType(camelCasedName);

    if (async) {
      const asyncCase = new CaseAsync(camelCasedName, type);

      this._save(asyncCase);

      return asyncCase;
    }

    const syncCase = new Case(camelCasedName, type, payloadAsError);

    this._save(syncCase);

    return syncCase;
  }
}
