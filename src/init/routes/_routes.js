import { lazy } from 'react';

export const routes = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('@@/pages/main')),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/posts',
    component: lazy(() => import('@@/pages/posts')),
  },
  {
    path: '/',
    component: lazy(() => import('@@/pages/404')),
  },
];
