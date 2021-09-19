/**
 *
 * @typedef {string[]} AsyncTasks
 */

/**
 *
 * @typedef {Object} Error
 * @property {string} [name]
 * @property {string} message
 */

/**
 *
 * @typedef {string | Error} ActionErrorPayload
 */

/**
 *
 * @typedef {Object<string, ActionErrorPayload>} Errors
 */

/**
 *
 * @typedef {Object} State
 * @property {AsyncTasks} asyncTasks
 * @property {Errors} errors
 */

/**
 *
 * @typedef {Object} AsyncTypes
 * @property {string} pending
 * @property {string} fulfilled
 * @property {string} rejected
 */

class Slice {
  /**
   *
   * @type {string}
   * @protected
   */
  _name;

  /**
   *
   * @type {string}
   * @protected
   */
  _sliceName;

  /**
   *
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  createType() {
    return `${this._sliceName} [${this._name}]`;
  }
}

class SliceAction extends Slice {
  /**
   * @constructor
   * @param {string} sliceName
   * @param {string} name
   */
  constructor(sliceName, name) {
    super();

    this._sliceName = sliceName;
    this._name = name;
    this._type = this.createType();
  }

  /**
   *
   * @returns {string}
   */
  get type() {
    return this._type;
  }
}

export class SliceActionAsync extends SliceAction {
  /**
   *
   * @returns {AsyncTypes}
   */
  get type() {
    return {
      pending: this._type + ' pending',
      fulfilled: this._type + ' fulfilled',
      rejected: this._type + ' rejected',
    };
  }

  /**
   *
   * @returns {{
   *   isPending: (function(State): boolean),
   *   error: (function(State): ActionErrorPayload)
   * }}
   */
  get selector() {
    return {
      isPending: this._isPending,
      error: this._getError,
    };
  }

  /**
   *
   * @returns {{
   *   add: ((function(AsyncTasks): AsyncTasks)),
   *   remove: (function(AsyncTasks): AsyncTasks)
   * }}
   */
  get asyncTask() {
    return {
      add: this._addAsyncTask,
      remove: this._removeAsyncTask,
    };
  }

  /**
   *
   * @returns {{
   *   add: (function(Errors, Error): Errors),
   *   remove: (function(Errors): Errors)
   * }}
   */
  get error() {
    return {
      add: this._addError,
      remove: this._removeError,
    };
  }

  /**
   *
   * @param {AsyncTasks} asyncTasks
   * @returns {AsyncTasks}
   * @private
   */
  _addAsyncTask = (asyncTasks) => {
    if (asyncTasks.some((r) => r === this.name)) return asyncTasks;

    return [...asyncTasks, this.name];
  };

  /**
   *
   * @param {AsyncTasks} asyncTasks
   * @returns {AsyncTasks}
   * @private
   */
  _removeAsyncTask = (asyncTasks) => {
    return asyncTasks.filter((r) => r !== this.name);
  };

  /**
   *
   * @param {State} state
   * @returns {boolean}
   * @private
   */
  _isPending = (state) => {
    return state.asyncTasks.some((r) => r === this.name);
  };

  /**
   *
   * @param {Errors} errors
   * @param {Error} error
   * @returns {Errors}
   * @private
   */
  _addError = (errors, error) => {
    const result = { ...errors };

    result[this.name] = error;

    return result;
  };

  /**
   *
   * @param {Errors} errors
   * @returns {Errors}
   * @private
   */
  _removeError = (errors) => {
    const result = { ...errors };

    delete result[this.name];

    return result;
  };

  /**
   *
   * @param {State} state
   * @returns {ActionErrorPayload}
   * @private
   */
  _getError = (state) => {
    return state.errors[this.name];
  };
}

export class SliceActionBuilder {
  constructor(sliceName) {
    this._sliceName = sliceName;
  }

  /**
   *
   * @param name
   * @param options
   * @param {boolean} options.async
   * @returns {SliceAction | SliceActionAsync}
   */
  build(name, options = {}) {
    const { async } = options;

    if (async) return new SliceActionAsync(this._sliceName, name);

    return new SliceAction(this._sliceName, name);
  }
}
