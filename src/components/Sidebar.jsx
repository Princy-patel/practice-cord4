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
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const getUser = useSelector((state) => state.auth.user);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = getUser?.email?.includes("admin")
    ? [
        {
          key: "1",
          label: "Users",
          icon: <UserOutlined />,
        },
        {
          key: "2",
          label: "Products",
          icon: <ProductOutlined />,
        },
      ]
    : [
        {
          key: "1",

          label: "Products",
          icon: <ProductOutlined />,
        },
        {
          key: "2",
          label: "Cart",
          icon: <ShoppingCartOutlined />,
        },
        {
          key: "3",
          label: "Setting",
          icon: <SettingOutlined />,
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
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
          <span className="font-bold text-lg">
            {getUser?.email?.includes("admin") ? "Admin" : getUser?.email}
          </span>
        </Header>
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
