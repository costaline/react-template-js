import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@@/app';
import { store } from '@@/init/store';
import { Loader } from '@@/shared/elements';
import { ErrorBoundary } from '@@/shared/hocs';
import reportWebVitals from './reportWebVitals';

import '@@/assets/styles/index.scss';

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

const path = document.getElementById('root');

ReactDOM.render(app, path);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
