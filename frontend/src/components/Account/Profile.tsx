import { useWallet } from "@solana/wallet-adapter-react";
import { Button, Descriptions, Row } from "antd";
import { QRCode } from "antd";
import { link } from "fs";
import { useGetUser } from "hooks/useUserHealthInformation";

import NextLink from "next/link";

const downloadQRCode = () => {
  const canvas = document
    .getElementById("myqrcode")
    ?.querySelector<HTMLCanvasElement>("canvas");
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "QRCode.png";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

export const Profile = () => {
  const { publicKey } = useWallet();
  const { data: healthInformation, isLoading } = useGetUser();

  const { origin } = window.location;

  return (
    <div>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        id="myqrcode"
      >
        <h3>Your QR Code: </h3>
        {isLoading && <div>Loading...</div>}
        {!isLoading && !healthInformation && (
          <div>Health information not found</div>
        )}
        {!isLoading && healthInformation && (
          <>
            <QRCode
              value={`${origin}/users/${publicKey}`}
              icon="/med-qr.png"
              size={300}
              iconSize={300 / 3}
            />

            <Button
              type="primary"
              size="large"
              href={`${origin}/users/${publicKey}`}
              //value={`${origin}/users/${publicKey}`}
            >
              Show QR Scan Results
            </Button>

            {/* <NextLink href={""}> */}
            <Button
              type="primary"
              onClick={downloadQRCode}
              // download="QRCode.png"
              style={{
                marginTop: "20px",
              }}
            >
              Download
            </Button>
            {/* </NextLink> */}
          </>
        )}
      </Row>
    </div>
  );
};
