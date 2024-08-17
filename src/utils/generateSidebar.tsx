import { NavLink } from "react-router-dom";
import { TUserPaths, TSidebar, TUserRoles } from "../types";

export const generateSidebar = (paths: TUserPaths[], role: TUserRoles) => {
  const sidebar = paths.reduce((acc: TSidebar[], item) => {
    if ((item.path || item.path === "") && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      const innerItem = item.children;

      acc.push({
        key: item.name,
        label: item.name,
        children: innerItem.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }
    return acc;
  }, []);

  return sidebar;
};
