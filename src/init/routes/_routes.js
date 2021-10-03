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
    path: '/posts-2',
    component: lazy(() => import('@@/pages/posts-2')),
  },
  {
    path: '/posts-3',
    component: lazy(() => import('@@/pages/posts-3')),
  },
  {
    path: '/posts-4',
    component: lazy(() => import('@@/pages/posts-4')),
  },
  {
    path: '/posts-5',
    component: lazy(() => import('@@/pages/posts-5')),
  },
  {
    path: '/posts-6',
    component: lazy(() => import('@@/pages/posts-6')),
  },
  {
    path: '/posts-7',
    component: lazy(() => import('@@/pages/posts-7')),
  },
  {
    path: '/',
    component: lazy(() => import('@@/pages/404')),
  },
];
