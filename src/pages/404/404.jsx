import { css } from '@emotion/react';
import styled from '@emotion/styled';

import './404.scss';

let Header = styled.h1`
  color: white;
  font-weight: bold;
  font-size: 2rem;
  margin: 0;
`;

export const Page404 = () => {
  return (
    <div
      className="page-404"
      css={css`
        background-color: lightblue;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Header
        css={css`
          text-align: center;
        `}
      >
        404 | Page not found
      </Header>
    </div>
  );
};
