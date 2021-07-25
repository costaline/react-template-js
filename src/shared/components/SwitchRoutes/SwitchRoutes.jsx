/* eslint-disable react/prop-types */
import { Redirect, Route, Switch } from 'react-router-dom';

export const SwitchRoutes = (props) => {
  const {
    routes,
    path = '',
    routeComponent: RouteComponent = Route,
    parentComponentProps = {},
  } = props;

  return (
    <Switch>
      {routes.map((item, i) => {
        const {
          path: routePath,
          routes: subRoutes,
          redirect,
          component: Component,
          meta,
          ...restRouteProps
        } = item;

        if (meta?.skip) return null;

        const fullPath = path + routePath;

        if (subRoutes && subRoutes.length) {
          return (
            <RouteComponent
              key={fullPath || i}
              path={fullPath}
              render={(componentProps) => (
                <SwitchRoutes
                  parentComponentProps={componentProps}
                  path={fullPath}
                  routes={subRoutes}
                />
              )}
            />
          );
        }

        if (redirect) {
          let pathToRedirect = '';

          if (Array.isArray(redirect)) {
            const [redirectPath, isRoot] = redirect;

            pathToRedirect = isRoot ? redirectPath : path + redirectPath;
          } else if (typeof redirect === 'string') {
            pathToRedirect = path + redirect;
          } else {
            throw new Error(
              `Unexpected redirect value. Must only be "string" or [string, boolean]`
            );
          }

          return (
            <Redirect
              key={path + routePath || i}
              from={fullPath}
              to={pathToRedirect}
              {...restRouteProps}
            />
          );
        }

        if (Component) {
          return (
            <RouteComponent
              key={fullPath || i}
              path={fullPath}
              {...restRouteProps}
              render={(componentProps) => (
                <Component
                  {...componentProps}
                  {...parentComponentProps}
                  meta={meta}
                />
              )}
            />
          );
        }

        return null;
      })}
    </Switch>
  );
};
