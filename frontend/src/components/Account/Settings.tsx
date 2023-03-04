import React, { useCallback, useMemo, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Spin,
  Switch,
} from "antd";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  useGetUser,
  useUserCreate,
  useUserUpdate,
} from "hooks/useUserHealthInformation";
import { Gender, healthInformationType } from "framework/TimeOfLifeClient";
import { useRouter } from "next/router";

const { Option } = Select;

const bloodTypes = [
  "A0 Rh+",
  "A0 Rh-",
  "A Rh+",
  "A Rh-",
  "B Rh+",
  "B Rh-",
  "AB Rh+",
  "AB Rh-",
  "O Rh+",
  "O Rh-",
];

const genders = ["Male", "Female"];

const diseases = [
  "AIDS",
  "Alzheimer's disease",
  "Anemia",
  "Arthritis",
  "Asthma",
  "Autism",
  "Bipolar disorder",
  "Cancer",
  "Cerebral palsy",
  "Chronic obstructive pulmonary disease",
  "Cystic fibrosis",
  "Diabetes",
  "Epilepsy",
  "Fibromyalgia",
  "Gastroesophageal reflux disease",
  "Glaucoma",
  "Heart disease",
  "Hepatitis",
  "HIV/AIDS",
  "Hypertension",
  "Hypothyroidism",
  "Kidney disease",
  "Lupus",
  "Migraine",
];

export const Settings = () => {
  const [form] = Form.useForm();
  const anchorWallet = useAnchorWallet();
  const createHealthInformation = useUserCreate();
  const updateHealthInformation = useUserUpdate();
  const { isLoading, data: healthInformation } = useGetUser();

  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values: healthInformationType) => {
    if (!anchorWallet) return;
    console.log(values);
    try {
      const data = {
        ...values,
        isPregnant: values.isPregnant || false,
        meds: values.meds || [],
      };

      if (!healthInformation) {
        await createHealthInformation.mutateAsync(data);
        router.push("/account");
      } else await updateHealthInformation.mutateAsync(data);

      messageApi.open({
        type: "success",
        content: healthInformation
          ? "Your profile has been successfully updated!"
          : "Your profile has been successfully created!",
      });
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  };

  const parseGender = useCallback(() => {
    if (!healthInformation) return;

    if (healthInformation.gender.male) return Gender.MALE;
    if (healthInformation.gender.female) return Gender.FEMALE;
  }, [healthInformation]);

  return (
    <>
      {!isLoading && (
        <Form
          form={form}
          layout="vertical"
          name="settings-form"
          scrollToFirstError
          onFinish={onSubmit}
          initialValues={{
            name: healthInformation?.name,
            lastName: healthInformation?.lastName,
            age: healthInformation?.age,
            weight: healthInformation?.weight,
            height: healthInformation?.size,
            bloodType: healthInformation?.bloodType,
            gender: parseGender(),
            isPregnant: healthInformation?.isPregnant || false,
            isDisabled: healthInformation?.isDisabled || false,
            meds: healthInformation?.meds || [],
            diseases: healthInformation?.diseases || [],
          }}
        >
          <Spin tip="Loading..." spinning={isLoading}>
            {contextHolder}
            <Form.Item
              name="name"
              label="Name"
              required
              tooltip="This is a required field"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="age"
              label="Age"
              required
              tooltip="This is a required field"
              rules={[{ required: true, message: "Please input your age!" }]}
            >
              <InputNumber min={15} max={99} />
            </Form.Item>

            <Form.Item
              name="weight"
              label="Weight (kg)"
              required
              tooltip="This is a required field"
              rules={[{ required: true, message: "Please input your weight!" }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="height"
              label="Height (cm)"
              required
              tooltip="This is a required field"
              rules={[{ required: true, message: "Please input your height!" }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="bloodType"
              label="Blood Type"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Please input your blood type!" },
              ]}
            >
              <Select
                placeholder="Select a blood type"
                onChange={(value) => {
                  form.setFieldsValue({ bloodType: value });
                }}
                allowClear
              >
                {bloodTypes.map((bloodType) => (
                  <Option key={bloodType} value={bloodType}>
                    {bloodType}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Select
                placeholder="Select a gender"
                onChange={(value) => {
                  form.setFieldsValue({ gender: value });
                }}
                allowClear
              >
                {genders.map((gender) => (
                  <Option key={gender} value={gender}>
                    {gender}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.gender !== currentValues.gender
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("gender") === "Female" ? (
                  <Form.Item
                    name="isPregnant"
                    label="Is Pregnant"
                    tooltip="This is a required field"
                  >
                    <Switch
                      onChange={(value) => {
                        form.setFieldsValue({ isPregnant: value });
                      }}
                    />
                  </Form.Item>
                ) : null
              }
            </Form.Item>

            <Form.Item
              name="isDisabled"
              label="Are you disabled?"
              tooltip="This is a required field"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="diseases"
              label="Diseases"
              tooltip="This is a required field"
            >
              <Select
                mode="tags"
                placeholder="Please select or enter a disease!"
                onChange={(value) => {
                  form.setFieldsValue({ diseases: value });
                }}
                style={{ width: "100%" }}
                options={diseases.map((disease) => {
                  return { label: disease, value: disease };
                })}
              />
            </Form.Item>

            <Form.Item
              name="meds"
              label="Meds"
              tooltip="This is a required field"
            >
              <Select
                mode="tags"
                placeholder="Please select or enter  meds!"
                onChange={(value) => {
                  form.setFieldsValue({ meds: value });
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={
                  createHealthInformation.isLoading ||
                  updateHealthInformation.isLoading
                }
              >
                {healthInformation ? "Update" : "Register"}
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      )}
    </>
  );
};
