import { camelCase } from 'camel-case';

export class Case {
  constructor(name, type, payloadAsError) {
    this._name = camelCase(name);
    this._type = type;

    /**
     * Action Creator
     */
    this.ac = this._createAction(type, payloadAsError);
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
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
