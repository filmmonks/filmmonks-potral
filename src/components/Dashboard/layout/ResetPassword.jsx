import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import backgroundImage from "../../../assets/bg.png";

import { styled } from "styled-components";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  const handleResetPassword = async (values) => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(values.email);
      message.success("Password reset email sent. Check your inbox.");
    } catch (error) {
      message.error("Error sending password reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResetPasswordWrapper>
      <div className="reset-password-page">
        <div className="reset-password-form">
          <h2>Forgot Password</h2>
          <Form name="forgot-password-form" onFinish={handleResetPassword}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" loading={loading} block>
                Reset Password
              </Button>
            </Form.Item>
          </Form>
          <Link to="/">Log-In</Link>
        </div>
      </div>
    </ResetPasswordWrapper>
  );
};
const ResetPasswordWrapper = styled.div`
  .reset-password-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: black;
    background-image: url(${backgroundImage});
    background-size: cover;
  }

  .reset-password-form {
    width: 300px;
    background-color: #7c6c6ccc;
    padding: 20px;
    border-radius: 4px;
  }
`;
export default ResetPassword;
