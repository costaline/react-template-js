import { camelCase } from 'camel-case';

import { AsyncCase } from './AsyncCase';
import { Case } from './Case';

export class Slice {
  actions = {};
  types = {};

  constructor(name) {
    this.name = camelCase(name);
  }

  /** @return {Slice} */
  add(name, options = {}) {
    return this._createCase(name, options, false);
  }

  /**
   *
   * @param name
   * @param [options]
   * @return {Case|AsyncCase}
   */
  create(name, options = {}) {
    return this._createCase(name, options, true);
  }

  /**
   *
   * @param name
   * @param options
   * @param isReturnable
   * @return {Case|AsyncCase|Slice}
   * @private
   */
  _createCase(name, options, isReturnable) {
    const { async, asError = false } = options;

    let sliceCase;

    if (async) {
      sliceCase = new AsyncCase(this.name, name);
    } else {
      sliceCase = new Case(this.name, name, { asError });
    }

    this._save(sliceCase);

    return isReturnable ? sliceCase : this;
  }

  /** @private */
  _save(sliceCase) {
    const saver = (target) => {
      this.actions[target.name] = target.ac;
      this.types[target.name] = target.type;
    };

    if (sliceCase instanceof AsyncCase) {
      for (const key in sliceCase) {
        if (sliceCase[key] instanceof Case) {
          saver(sliceCase[key]);
        }
      }
    } else {
      saver(sliceCase);
    }
  }
}
