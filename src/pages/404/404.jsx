import { css } from '@emotion/react';
import styled from '@emotion/styled';

import './404.scss';

const Header = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: white;
`;

export const Page404 = () => {
  return (
    <div
      className="page-404"
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: lightblue;
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
