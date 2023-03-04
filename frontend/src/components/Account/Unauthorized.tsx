import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Result } from "antd";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import Link from "./png/error.png";
import { GhostIcon } from "assets/styles/icons";
import { useMediaQuery } from "react-responsive";

export const Unauthorized = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px)" });
  return (
    <Result
      icon={<GhostIcon />}
      style={{
        margin: "auto",
        
      }}
      title="403"
      subTitle={
        <h2
          style={{
            margin: "auto",
          }}
        >
          Sorry, you are not authorized to access this page. First you need to
          connect your wallet. You can connect your wallet from the top right
          corner.
        </h2>
      }
      extra={
        <WalletMultiButton
          style={{
            margin: "auto",
          }}
        />
      }
    />
  );
};
