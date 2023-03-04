import { Button, Form, Input, Modal, Select } from "antd";
import { MaskedInput } from "antd-mask-input";
import { useEffect, useState } from "react";

const { Option } = Select;

type CreateAccountPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

enum CreateAccountStep {
  PHONE_NUMBER,
  VERIFICATION_CODE,
}

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="+90">+90</Option>
    </Select>
  </Form.Item>
);

export const CreateAccountPopup = (props: CreateAccountPopupProps) => {
  const { isOpen, onClose } = props;

  const [step, setStep] = useState(CreateAccountStep.PHONE_NUMBER);

  useEffect(() => {
    phoneNumberForm.resetFields();
    verificationCodeForm.resetFields();
    setStep(CreateAccountStep.PHONE_NUMBER);
  }, [isOpen]);

  const [phoneNumberForm] = Form.useForm();
  const [verificationCodeForm] = Form.useForm();

  const onPhoneNumberFinish = (values: any) => {
    setStep(CreateAccountStep.VERIFICATION_CODE);
  };

  const onPhoneNumberVerification = () => {};

  return (
    <Modal
      title="Create Account"
      open={isOpen}
      footer={false}
      // onOk={onClose}
      onCancel={onClose}
    >
      {step === CreateAccountStep.PHONE_NUMBER && (
        <Form
          // {...formItemLayout}
          layout="vertical"
          form={phoneNumberForm}
          name="phone-number-form"
          onFinish={onPhoneNumberFinish}
          initialValues={{
            prefix: "+90",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^\(\d{3}\)\-\d{3}\-\d{2}\-\d{2}$/,
                message: "Please input a valid phone number!",
              },
            ]}
          >
            <MaskedInput
              mask={"(000)-000-00-00"}
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Phone Code
            </Button>
          </Form.Item>
        </Form>
      )}
      {step === CreateAccountStep.VERIFICATION_CODE && (
        <Form
          // {...formItemLayout}
          layout="vertical"
          form={verificationCodeForm}
          name="code-verification-form"
          onFinish={onPhoneNumberFinish}
          scrollToFirstError
        >
          <Form.Item
            name="verification-code"
            label="Verification code"
            rules={[
              {
                required: true,
                message: "Please input your phone verification code!",
              },
              {
                pattern: /^\d{3}\ \d{3}$/,
                message: "Please input a valid verification code!",
              },
            ]}
          >
            <MaskedInput
              mask={"000 000"}
              placeholder="000 000"
              // type="number"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
