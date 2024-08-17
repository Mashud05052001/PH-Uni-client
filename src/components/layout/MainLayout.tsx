import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Slidebar from "./Slidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;

// const items2: MenuProps["items"] = [
//   {
//     key: "Dashboard",
//     icon: "",
//     label: <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>,
//   },
//   {
//     key: "User Management",
//     label: "User Management",
//     children: [
//       {
//         key: "Create Admin",
//         icon: "",
//         label: <NavLink to={"/admin/create-admin"}>Create Admin</NavLink>,
//       },
//       {
//         key: "Create Faculty",
//         icon: "",
//         label: <NavLink to={"/admin/create-faculty"}>Create Faculty</NavLink>,
//       },
//       {
//         key: "Create Student",
//         icon: "",
//         label: <NavLink to={"/admin/create-student"}>Create Student</NavLink>,
//       },
//     ],
//   },
// ];

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <Slidebar />
        <Layout>
          <Header style={{ padding: 0, position: "relative" }}>
            <Button
              style={{
                position: "absolute",
                top: "50%",
                right: "2rem",
                translate: "0 -50%",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
