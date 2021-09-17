import { css } from '@emotion/react';

import { Logo } from '@@/shared/elements';

import './main.sass';

export const Main = () => (
  <div className="main">
    <style jsx>{`
      p {
        color: red;
        text-decoration: dashed;
        text-transform: uppercase;
      }
    `}</style>
    <header className="main__header">
      <Logo />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="main__link"
        css={css`
          text-transform: uppercase;
        `}
        href="https://reactjs.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        Learn React
      </a>
    </header>
  </div>
);
