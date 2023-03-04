import React, { useEffect, useState } from "react";

import { Layout, Menu, theme } from "antd";
import { menuItems, Sidebar } from "components/Account/Sidebar";
import { Unauthorized } from "components/Account/Unauthorized";
import { AccountHeader } from "components/Account/Header";
import { useWallet } from "@solana/wallet-adapter-react";

const { Header, Sider, Content } = Layout;

const Account: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeComponentKey, setActiveComponentKey] = useState<string>(
    menuItems[0].key
  );

  const [activeComponent, setActiveComponent] = useState<React.ReactNode>();

  useEffect(() => {
    const _activeComponent = menuItems.find(
      (item) => item.key === activeComponentKey
    );

    if (_activeComponent) setActiveComponent(_activeComponent.component);
  }, [activeComponentKey]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { publicKey } = useWallet();

  return (
    <Layout>
      <Sidebar
        collapsed={collapsed}
        setActiveComponentKey={(e: string) => setActiveComponentKey(e)}
      />
      <Layout className="site-layout">
        <AccountHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        />

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          {publicKey && activeComponent}
          {!publicKey && <Unauthorized />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Account;
