import { Logo } from '@@/shared/elements';

import './main.scss';

export const Main = () => (
  <div className="main">
    <header className="main__header">
      <Logo />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="main__link"
        href="https://reactjs.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        Learn React
      </a>
    </header>
  </div>
);
