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
    path: '/messages',
    component: lazy(() => import('@@/pages/messages')),
  },
  {
    path: '/',
    component: lazy(() => import('@@/pages/404')),
  },
];
