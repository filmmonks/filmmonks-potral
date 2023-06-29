import  { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);

      // Check login credentials
      if (values.username === "admin" && values.password === "password") {
        // Successful login
        message.success("Login successful!");
      } else {
        // Invalid credentials
        message.error("Invalid username or password");
      }
    }, 1500);
  };

  return (
    <LoginWrapper>
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <Form name="login-form" onFinish={handleLogin}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please enter your username" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80");
    background-size: cover;
  }

  .login-form {
    width: 300px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 4px;
  }
`;

export default LoginPage;
