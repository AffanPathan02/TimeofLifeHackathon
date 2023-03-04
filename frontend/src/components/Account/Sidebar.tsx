import { Col, Layout, Menu } from "antd";

const { Sider } = Layout;

import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Profile } from "./Profile";
import { Settings } from "./Settings";

type SidebarProps = {
  collapsed: boolean;
  setActiveComponentKey: (key: string) => void;
};

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  component?: React.ReactNode;
  label: string;
};

export const menuItems: MenuItem[] = [
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
    component: <Profile />,
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
    component: <Settings />,
  },
];

export const Sidebar = (props: SidebarProps) => {
  const { collapsed, setActiveComponentKey } = props;

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
      <div
        className="logo"
        style={{
          padding: "15px",
          textAlign: "center",
        }}
      >
        <img src="/logo.png" alt="logo" width="100%" />
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[menuItems[0].key]}
        items={menuItems}
        onSelect={({ key }) => setActiveComponentKey(key)}
      />
    </Sider>
  );
};
