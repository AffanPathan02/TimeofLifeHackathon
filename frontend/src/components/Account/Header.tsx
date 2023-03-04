import { Col, Layout, Menu, Row, theme } from "antd";
import { Sidebar } from "components/Account/Sidebar";
import { Unauthorized } from "components/Account/Unauthorized";

const { Header, Sider, Content } = Layout;
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Component } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

type AccountHeaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  colorBgContainer: string;
};

export const AccountHeader = (props: AccountHeaderProps) => {
  const { collapsed, setCollapsed, colorBgContainer } = props;

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Row
        align="middle"
        justify="space-between"
        style={{
          padding: "5px 20px",
        }}
      >
        <Col>
          <span
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: "block",
              cursor: "pointer",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </Col>

        <Col>
          <WalletMultiButton />
        </Col>
      </Row>
    </Header>
  );
};
