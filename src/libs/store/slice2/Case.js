import { camelCase } from 'camel-case';

/**
 * @typedef {Object} Action
 * @property {string} type
 */

/**
 * @typedef {Object} ActionPayload
 * @property {string} type
 * @property {*} payload
 */

/**
 * @typedef {Object} ActionError
 * @property {string} type
 * @property {*} error
 */

/**
 * @typedef {function(): Action} ActionCreator
 */

/**
 * @typedef {function(*): ActionPayload|ActionError} ActionCreatorWithPayload
 */

export class Case {
  static createType(sliceName, name, status) {
    return `${sliceName} [${name}]` + (status ? ` ${status}` : '');
  }

  /**
   *
   * @param {string} type
   * @param {boolean} payloadAsError
   * @return {ActionCreator|ActionCreatorWithPayload}
   */
  static createActionCreator(type, payloadAsError) {
    return (payload = null) => {
      if (!payload) return { type };

      if (payloadAsError) return { type, error: payload };

      return { type, payload };
    };
  }

  constructor(sliceName, name, options) {
    const { status = null, asError = false } = options;

    this.name = camelCase(name);
    this.type = Case.createType(sliceName, this.name, status);
    this.ac = Case.createActionCreator(this.type, asError);
  }
}
