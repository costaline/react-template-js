import { Logo } from '@@/shared/elements';

import './app.scss';

export function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Logo />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
