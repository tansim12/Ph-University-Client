import React from "react";
import { Button, Layout, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/Features/Auth/authSlice";
import { toast } from "sonner";
const { Header, Content } = Layout;
const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    const toastId = toast.loading("Logout pending");
    dispatch(logout());

    toast.success("Logout Successfully done", { id: toastId, duration: 2000 });
    navigate("/login");
  };

  return (
    <Layout className="h-screen">
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button onClick={handleLogOut}>Log Out</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
