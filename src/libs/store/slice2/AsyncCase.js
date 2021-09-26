import { camelCase } from 'camel-case';

import { AsyncTaskHelper } from './AsyncTaskHelper';
import { Case } from './Case';
import { ErrorHelper } from './ErrorHelper';

export class AsyncCase {
  constructor(sliceName, name) {
    this.name = camelCase(name);

    this.start = new Case(sliceName, name, { status: 'start' });
    this.success = new Case(sliceName, name, { status: 'success' });
    this.failure = new Case(sliceName, name, {
      status: 'failure',
      asError: true,
    });

    this.asyncTask = new AsyncTaskHelper(this.name);
    this.error = new ErrorHelper(this.name);
  }
}
