import { routes } from './_routes';

export class Routes {
  /**
   * @private
   */
  static _routes = routes;

  static get all() {
    return this._routes;
  }
}
