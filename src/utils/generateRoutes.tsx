import { TUserPaths, TRoute } from "../types";

export const generateRoutes = (paths: TUserPaths[]) => {
  const routes = paths.reduce((acc: TRoute[], item) => {
    if ((item.path || item.path === "") && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    if (item.children) {
      item.children.forEach((child) => {
        if ((child.path || child.path === "") && child.element) {
          acc.push({
            path: child.path,
            element: child.element,
          });
        }
      });
    }
    return acc;
  }, []);

  return routes;
};
