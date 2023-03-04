import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button, Col, Row } from "antd";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { CreateAccountPopup } from "./CreateAccountPopup";

const MenuLink = (props: PropsWithChildren<{}>) => {
  return (
    <Button
      type="link"
      style={{
        fontSize: "24px",
        fontWeight: "400",
        color: "#1F1534",
        opacity: "0.5",
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export const Header = () => {
  const [isCreateAccountPopupOpen, setIsCreateAccountPopupOpen] =
    useState(false);

  return (
    <Row
      align="middle"
      justify="space-between"
      style={{
        padding: "20px ",
        background: "white",
        justifyContent: "center",
      }}
    >
      <Col>
        <img src="/logo.png" alt="logo" height="180px" />
      </Col>

      {/* <Col
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <MenuLink>
          <Link
            href="/account"
            style={{
              color: "#1F1534",
            }}
          >
            Account
          </Link>
        </MenuLink>
      </Col> */}

      {/* <CreateAccountPopup
        isOpen={isCreateAccountPopupOpen}
        onClose={() => setIsCreateAccountPopupOpen(false)}
      /> */}
    </Row>
  );
};
