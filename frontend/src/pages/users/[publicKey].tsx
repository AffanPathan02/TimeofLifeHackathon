import { PublicKey } from "@solana/web3.js";
import { Layout } from "antd";
import { Header } from "components/Header";
import { Gender } from "framework/TimeOfLifeClient";
import { useGetUser } from "hooks/useUserHealthInformation";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import React from "react";
import { Card, Col, Row, Avatar, Skeleton, Switch } from "antd";

//import React, { useState } from 'react';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  UserOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { MdOutlineBloodtype } from "react-icons/md";
import { TbGenderBigender } from "react-icons/tb";
import { FaDisease } from "react-icons/fa";
import { CiMedicalCross } from "react-icons/ci";
import { GiBodyHeight } from "react-icons/gi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { MdElderly } from "react-icons/md";
import { BiHandicap } from "react-icons/bi";
import { MdPregnantWoman } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import { HiIdentification } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";

export default function UserHealthInformation(props: {
  publicKey: string;
}): JSX.Element {
  const { publicKey } = props;

  const { data: healthInformation, isLoading } = useGetUser(
    new PublicKey(publicKey as string)
  );

  const parseGender = useCallback(() => {
    if (!healthInformation) return;

    if (healthInformation.gender.male) return Gender.MALE;
    if (healthInformation.gender.female) return Gender.FEMALE;
  }, [healthInformation]);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px)" });

  function hsl(
    arg0: number,
    arg1: number,
    arg2: number
  ): import("csstype").Property.Color | undefined {
    throw new Error("Function not implemented.");
  }

  function rgb(
    arg0: number,
    arg1: number,
    arg2: number
  ): import("csstype").Property.Color | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <Layout>
      <Header />

      <main
        style={{
          padding: "0 100px",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Col xs={24} lg={12}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "bold",

              lineHeight: "40px",
              color: "red",
            }}
          >
            <InfoCircleOutlined size={30} /> Health Information
          </h1>
        </Col>
        {isLoading && (
          <div id="css3-spinner-svg-pulse-wrapper">
            <svg
              id="css3-spinner-svg-pulse"
              version="1.2"
              height="310"
              width="550"
              xmlns="http://www.w3.org/2000/svg"
              // viewport="0 0 60 60"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                id="css3-spinner-pulse"
                stroke="#DE6262"
                fill="none"
                stroke-width="2"
                stroke-linejoin="round"
                d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210"
              />
            </svg>
          </div>
        )}
        {publicKey && !isLoading && !healthInformation && (
          <div>Health information not found</div>
        )}
        {publicKey && !isLoading && healthInformation && (
          <>
            <div className="site-card-wrapper">
              <Row gutter={8}>
                <Col span={50}>
                  <Card
                    title={
                      <div>
                        <h1
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",

                            lineHeight: "20px",
                          }}
                        >
                          <UserOutlined size={30} /> {healthInformation.name}{" "}
                          {healthInformation.lastName}
                        </h1>
                      </div>
                    }
                    bordered={false}
                    loading={isLoading}
                  >
                    <div>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "normal",
                          lineHeight: "30px",
                        }}
                      >
                        <HiOutlineIdentification size={30} /> Name:{" "}
                        {healthInformation.name}
                      </h2>
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "normal",

                          lineHeight: "30px",
                        }}
                      >
                        <HiIdentification size={30} /> Surname:{" "}
                        {healthInformation.lastName}
                      </h2>
                    </div>

                    <div>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "normal",
                          lineHeight: "30px",
                        }}
                      >
                        <MdElderly color="#D97706" size={30} /> Age:{" "}
                        {healthInformation.age}
                      </h2>
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "normal",
                          lineHeight: "30px",
                        }}
                      >
                        <GiWeightLiftingUp color="#60A5FA" size={30} /> Weight:{" "}
                        {healthInformation.weight}
                      </h2>
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "normal",
                          lineHeight: "30px",
                        }}
                      >
                        <GiBodyHeight color="#34D399" size={30} /> Height:{" "}
                        {healthInformation.size}
                      </h2>
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "normal",
                          lineHeight: "30px",
                        }}
                      >
                        <TbGenderBigender color="#6D28D9" size={30} /> Gender:{" "}
                        {parseGender() === Gender.MALE ? (
                          <ManOutlined />
                        ) : (
                          <WomanOutlined />
                        )}
                      </h2>
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "normal",
                          lineHeight: "30px",
                        }}
                      >
                        <MdOutlineBloodtype color="#991B1B" size={30} /> Blood
                        Type: {healthInformation.bloodType}
                      </h2>
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "normal",
                          lineHeight: "30px",
                        }}
                      >
                        <FaDisease color="#064e3b" size={30} /> Diseases:{" "}
                        {healthInformation.diseases.join(", ")}
                      </h2>
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "normal",
                          lineHeight: "30px",
                        }}
                      >
                        <CiMedicalCross color="red" size={30} /> Meds:{" "}
                        {healthInformation.meds.join(", ")}{" "}
                      </h2>
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "20px",

                          fontWeight: "normal",
                          lineHeight: "30px",
                        }}
                      >
                        <BiHandicap color="orange" size={30} /> Handicapped:{" "}
                        {healthInformation.isDisabled ? " Yes" : " No"}
                      </h2>
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "normal",
                          lineHeight: "30px",
                        }}
                      >
                        <MdPregnantWoman color="#F472B6" size={30} /> Pregnant:
                        {healthInformation.isPregnant ? " Yes" : " No"}
                      </h2>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            {/* <Card style={{ width: 300, marginTop: 16 }} loading={isLoading}>
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Card title"
                description="This is the description"
              />
            </Card> */}
          </>
        )}{" "}
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { publicKey } = context.query;

  return {
    props: {
      publicKey,
    },
  };
}
