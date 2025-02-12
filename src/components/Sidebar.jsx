import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.auth.user);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = function () {
    localStorage.removeItem("userData");
    localStorage.removeItem("useInfo");
    navigate("/login");
  };

  const menuItems = getUser?.email?.includes("admin")
    ? [
        {
          key: "1",
          label: "Users",
          icon: <UserOutlined />,
          onClick: () => navigate("/users"),
        },
        {
          key: "2",
          path: "/products",
          label: "Products",
          icon: <ProductOutlined />,
          onClick: () => navigate("/products"),
        },
      ]
    : [
        {
          key: "1",
          label: "Products",
          icon: <ProductOutlined />,
          onClick: () => navigate("/"),
        },
        {
          key: "2",
          label: "Cart",
          icon: <ShoppingCartOutlined />,
          onClick: () => navigate("/cart"),
        },
        {
          key: "3",
          label: "Setting",
          icon: <SettingOutlined />,
          onClick: () => navigate("/setting"),
        },
        {
          key: "4",
          path: "/add-rule",
          label: "Rulebook",
          icon: <ProductOutlined />,
          onClick: () => navigate("/add-rule"),
        },
      ];

  return (
    <Layout className="h-screen w-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{ background: colorBgContainer }}
          className="flex justify-between items-center px-4"
        >
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <h1 className="text-xl font-semibold">
              Welcome,{" "}
              {getUser?.email?.includes("admin") ? "Admin" : getUser?.email}
            </h1>
          </div>
          <Button
            type="text"
            icon={<IoIosLogOut className="w-4 h-4" />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Header>
        {/* <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="">
            <span className="font-bold text-lg">
              {getUser?.email?.includes("admin") ? "Admin" : getUser?.email}
            </span>

            <button>LogOut</button>
          </div>
        </Header> */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
