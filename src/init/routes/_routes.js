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
    path: '/posts-1',
    component: lazy(() => import('@@/pages/posts-1')),
  },
  {
    path: '/',
    component: lazy(() => import('@@/pages/404')),
  },
];
