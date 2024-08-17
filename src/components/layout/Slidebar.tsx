import { Menu, MenuProps, Layout } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { generateSidebar } from "../../utils/generateSidebar";
import { TUserPaths, TUserRoles } from "../../types";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { TUser, selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;
const Slidebar = () => {
  const user = useAppSelector(selectCurrentUser) as TUser;
  const allPaths: Record<TUserRoles, TUserPaths[]> = {
    admin: adminPaths,
    faculty: facultyPaths,
    student: studentPaths,
  };
  const sideBarItems: MenuProps["items"] =
    generateSidebar(allPaths[user.role], user.role) || undefined;

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      //   onBreakpoint={(broken) => {}}
      //   onCollapse={(collapsed, type) => {}}
    >
      <div
        style={{
          color: "white",
          fontSize: "1.4rem",
          textAlign: "center",
          margin: "0.95rem 0",
          fontWeight: "600",
          whiteSpace: "nowrap",
        }}
      >
        Ph University
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sideBarItems}
      />
    </Sider>
  );
};

export default Slidebar;
