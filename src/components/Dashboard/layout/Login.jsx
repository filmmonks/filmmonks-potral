import { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
// import image from  "../../../assets/Black Simple YouTube Thumbnail"
import auth from "../../../firebase.init";
import backgroundImage from "../../../assets/bg.png";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);
    console.log(values);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      signInWithEmailAndPassword(values.username, values.password);
    }, 1500);
  };
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  return (
    <LoginWrapper>
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <Form name="login-form" onFinish={handleLogin}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" loading={loading} block>
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              <Button block onClick={() => signInWithGoogle()}>
                Sign In With Google
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
    background: black;
    background-image: url(${backgroundImage});
    background-size: cover;
  }

  .login-form {
    width: 300px;
    background-color: #7c6c6ccc;
    padding: 20px;
    border-radius: 4px;
  }
`;

export default LoginPage;
