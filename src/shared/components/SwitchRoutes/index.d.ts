import { ComponentType, FC } from 'react';
import { RouteProps } from 'react-router-dom';

export interface RouteMeta extends Record<string, unknown> {
  skip?: boolean;
}

export interface RouteType<M = {}> extends RouteProps {
  meta?: M & RouteMeta;
  routes?: RouteType<M>[];
  redirect?: string | [string, boolean];
  path?: string;
}

export interface RoutesProps {
  routes: RouteType[];
  path?: string;
  routeComponent?: ComponentType<any>;
  parentComponentProps?: RouteComponentProps<any>;
}

export declare const SwitchRoutes: FC<RoutesProps>;
